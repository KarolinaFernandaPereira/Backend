import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { LoginDTO, UserDTO } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig2 from 'src/multer.config';

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

  @Post('arquivo')
  @UseInterceptors(FileInterceptor('arquivo', multerConfig2))
  uploadArquivo(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Body() body: { id: string },
  ) {
    return this.usuarioService.upload(file, req, body.id);
  }
}
