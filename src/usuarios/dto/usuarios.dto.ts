import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';
import { ReservaDto } from 'src/reservas/reservas/dto/reservas.dto';

export class UsuarioDto {
  id: number;

  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  avatar: string = '';

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;

  @IsOptional()
  reservas: ReservaDto[];

  rol: string;
}
