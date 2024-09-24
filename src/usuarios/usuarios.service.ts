import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { AuthService } from './auth/auth.service';
import { UsuarioDto } from './dto/usuarios.dto';
import { UsuarioEntity } from './entity/usuarios.entity';
import { LoginDto } from './dto/login.dto';
import { Paginator } from 'src/common';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly repo: Repository<UsuarioDto>,
    private readonly authService: AuthService,
  ) {}

  async register(usuario: UsuarioDto) {
    try {
      //! The hash fails if doesn't exist the string
      if (!usuario.password) throw new UnauthorizedException('No password');

      const hash = await this.authService.hashPassword(usuario.password);
      usuario.password = hash;

      const result = await this.repo.save(usuario);
      return result;
    } catch (err: any) {
      console.error(err);
      if (err instanceof QueryFailedError) {
        console.error(err.query);
        throw new HttpException(`${err.name} ${err.driverError}`, 404);
      }
      throw new HttpException(err.message, err.status);
    }
  }

  async login(credenciales: LoginDto) {
    try {
      const { email, pass } = credenciales;
      const user = await this.repo.findOne({ where: { email } });
      console.log(user);

      if (!user) throw new NotFoundException('Usuario no encontrado');

      const isPassword = await this.authService.comparePassword(
        pass,
        user.password,
      );

      if (!isPassword) throw new UnauthorizedException('Contraseña incorrecta');

      const token = await this.authService.generateJwt(user);

      return token;
    } catch (err) {
      console.error(err);
      if (err instanceof QueryFailedError)
        throw new HttpException(`${err.name} ${err.driverError}`, 404);
      throw new HttpException(err.message, err.status);
    }
  }

  /**
   * @description Obtiene un usuario
   * @param id ID del usuario
   * @returns UsuarioDTO
   */
  async getOne(id: number, token?: string): Promise<UsuarioDto> {
    try {
      const esValido = await this.authService.verificarRol(['admin'], token);

      if (!esValido) throw new UnauthorizedException('Rol no válido');

      const usuario = await this.repo.findOne({
        where: { id },
        relations: { reservas: true },
      });

      if (!usuario) throw new NotFoundException('Usuario no encontrado');

      return usuario;
    } catch (err) {
      console.error(err);
      if (err instanceof QueryFailedError)
        throw new HttpException(`${err.name} ${err.driverError}`, 404);
      throw new HttpException(err.message, err.status);
    }
  }

  async updateUser(
    id: number,
    user: Partial<UsuarioDto>,
    file: Express.Multer.File,
  ) {
    try {
      if (file) {
        user.avatar = file.filename;
      }
      const oldUser = await this.getOne(id);

      const mergeUser = await this.repo.merge(oldUser, user);

      const result = await this.repo.save(mergeUser);

      return result;
    } catch (err) {
      console.error(err);
      if (err instanceof QueryFailedError)
        throw new HttpException(`${err.name} ${err.driverError}`, 404);
      throw new HttpException(err.message, err.status);
    }
  }

  async findMany(paginador?: Paginator) {
    try {
      const { page, perPage, sortBy } = paginador;
      const result = await this.repo.find({
        skip: page ? (page - 1) * perPage : undefined,
        take: perPage ? perPage : undefined,
        order: { id: sortBy == 'asc' ? 'asc' : 'desc' },
      });
      return result;
    } catch (error: any) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
