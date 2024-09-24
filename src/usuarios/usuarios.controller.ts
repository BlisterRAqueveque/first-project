import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Headers,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { UsuarioDto } from './dto/usuarios.dto';
import { UsuariosService } from './usuarios.service';
import { Paginator } from 'src/common';
import { ParamsTokenFactory } from '@nestjs/core/pipes';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly service: UsuariosService) {}

  @Post('auth/register')
  async register(@Body() usuario: UsuarioDto, @Res() response: Response) {
    const result = await this.service.register(usuario);
    response
      .status(HttpStatus.CREATED)
      .json({ ok: true, result, msg: 'creado' });
  }

  @Post('auth/login')
  async login(@Body() credenciales: LoginDto, @Res() res: Response) {
    const token = await this.service.login(credenciales);
    res.status(HttpStatus.OK).json({ ok: true, token, msg: 'approved' });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('files'))
  async updateUser(
    @Param('id') id: number,
    @Body() user: Partial<UsuarioDto>,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const result = await this.service.updateUser(id, user, file);
    res.status(HttpStatus.OK).json({ ok: true, result, msg: 'approved' });
  }

  @Get()
  async findAll(@Query() paginador: Paginator, @Res() res: Response) {
    const result = await this.service.findMany(paginador);

    res.status(HttpStatus.OK).json({
      ok: true,
      result,
      msg: 'Approved',
    });
  }

  @Get(':id')
  async getOne(
    @Headers('authorization') token: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      const splitString = token.split('Bearer '); // Bearer ${token}
      const result = await this.service.getOne(id, splitString[1]);
      return result;
    } catch (error) {
      return null;
    }
  }
}
