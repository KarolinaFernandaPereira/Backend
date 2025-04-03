import { Body, Controller, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { LoginDTO, UserDTO } from './dto/user.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}


  @Post('criar')
  criar(@Body() data: UserDTO):Promise<any> {
    return this.usuarioService.create(data)
  }

  @Post('login')
  login(@Body() data: LoginDTO):Promise<any> {
    return this.usuarioService.login(data)
  }
}
