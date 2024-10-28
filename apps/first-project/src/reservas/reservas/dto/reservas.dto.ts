import { Estado } from '../../../common';
import { UsuarioDto } from '../../../usuarios/dto/usuarios.dto';

export class ReservaDto {
  id: number;

  estado: Estado;

  usuario: UsuarioDto;
}
