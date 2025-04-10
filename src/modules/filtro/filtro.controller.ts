import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { FiltroService } from './filtro.service';
import { FiltroDTO } from './dto/filtro.dto';

@Controller('filtro')
export class FiltroController {
  constructor(private readonly filtroService: FiltroService) {}

  @Post('criar')
  criar(@Body() data: FiltroDTO):Promise<any> {
    return this.filtroService.create(data)
  }

  @Get('listar')
  listar(@Query('id') id: string){
    return this.filtroService.getNome(id)
  }

  @Get('list/')
  getId(@Query('id') id: string){
    return this.filtroService.getId(id)
  }

  @Get('favoritar/')
  favoritar(@Query('id') id: string){
    return this.filtroService.favoritar(id)
  }

  @Get('padrao/')
  padrao(@Query('id') id: string){
    return this.filtroService.padrao(id)
  }

  @Delete('deletar/')
    deletar(@Query('id') id: string){
      return this.filtroService.delete(id)
  }
}
