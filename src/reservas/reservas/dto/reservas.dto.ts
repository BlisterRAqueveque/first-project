import { Estado } from 'src/common';
import { UsuarioDto } from 'src/usuarios/dto/usuarios.dto';

export class ReservaDto {
  id: number;

  estado: Estado;

  usuario: UsuarioDto;
}
