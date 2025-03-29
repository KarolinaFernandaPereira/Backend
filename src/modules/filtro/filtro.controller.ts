import { Body, Controller, Get, Post } from '@nestjs/common';
import { FiltroService } from './filtro.service';
import { FiltroDTO } from './dto/filtro.dto';
import { Filtro } from '@prisma/client';

@Controller('filtro')
export class FiltroController {
  constructor(private readonly filtroService: FiltroService) {}

  @Post('criar')
  criar(@Body() data: FiltroDTO):Promise<any> {
    return this.filtroService.create(data)
  }

  @Get('listar')
  listar(){
    return this.filtroService.getNome()
  }
}
