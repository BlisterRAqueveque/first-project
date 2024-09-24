import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioDto } from '../dto/usuarios.dto';
import { UsuariosService } from '../usuarios.service';

@Injectable()
export class AuthService {
  /**
   * @param password new user's password
   * @returns hashed password
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  /**
   * @description compares the login password with the stored
   * @param password input password
   * @param hashPassword stored user's password
   * @returns boolean
   */
  async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }

  constructor(
    private jwtService: JwtService,
    private userService: UsuariosService,
  ) {}

  /**
   * @description compare user session jwt
   * @param jwt jwt from client
   * @returns payload
   */
  async verifyJwt(jwt: string): Promise<any> {
    return await this.jwtService.verifyAsync(jwt);
  }

  /**
   * @param Usuario
   * @returns token generado
   */
  async generateJwt(user: UsuarioDto): Promise<string> {
    /**
     * @description
     *  Creamos el payload con la información del usuario
     */
    const payload = {
      sub: user.id,
      email: user.email,
      nombre: user.nombre,
    };
    //* Retornamos el token
    return this.jwtService.signAsync(payload);
  }

  async verificarRol(roles: string[], token: string) {
    try {
      const decodedUser = await this.verifyJwt(token);
      const usuario = await this.userService.getOne(decodedUser.sub);

      return roles.includes(usuario.rol)
    } catch (error) {
      throw new UnauthorizedException('Token no válido');
    }
  }
}
