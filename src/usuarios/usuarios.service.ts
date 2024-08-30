import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { AuthService } from './auth/auth.service';
import { UsuarioDto } from './usuarios.dto';
import { Usuarios } from './usuarios.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios) private readonly repo: Repository<UsuarioDto>,
    private readonly authService: AuthService,
  ) {}

  async register(usuario: UsuarioDto) {
    try {
      //! The hash fails if doesn't exist the string
      //if (!usuario.password) throw new UnauthorizedException('No password');

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

  async login(email: string, pass: string) {
    try {
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
  async getOne(id: number): Promise<UsuarioDto> {
    try {
      const usuario = await this.repo.findOne({ where: { id } });

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
    files: Express.Multer.File[],
  ) {
    try {
      if (files.length > 0) {
        user.avatar = files[0].filename;
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
}
