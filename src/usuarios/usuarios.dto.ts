import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class UsuarioDto {
  id: number;

  @IsString()
  nombre: string;

  email: string;

  @IsString()
  password: string;

  avatar: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
