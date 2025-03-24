import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PrincipalService } from './principal.service';
import { PrincipalDTO } from './dto/principal.dto';
import { Principal } from '@prisma/client';
import { get } from 'http';

@Controller('principal')
export class PrincipalController {
  constructor(private readonly principalService: PrincipalService) {}



  @Post('criar')
  criar(@Body() data: PrincipalDTO):Promise<Principal> {
    return this.principalService.create(data)
  }

  @Get('listar')
  listar():Promise<any> {
    return this.principalService.getAll()
  }

  @Get('listarProd')
  listarV2():Promise<any> {
    return this.principalService.getAll_V2()
  }

  @Get('volume')
  volume():Promise<any> {
    return this.principalService.volume()
  }

  @Get('agressao')
  agressao():Promise<any> {
    return this.principalService.agressao()
  }

  @Get('distri')
  distriVolume():Promise<any> {
    return this.principalService.distribuicao_volume()
  }

  @Get('distriCompra')
  distriCompra():Promise<any> {
    return this.principalService.distribuicao_compra()
  }

  @Get('bloxplot')
  blox():Promise<any> {
    return this.principalService.bloxPlot()
  }

  @Get('volumePrice')
  volumePrice(@Query() filtroA ):Promise<any> {
    
      
    return this.principalService.volumePrice(filtroA)
  }
  
}
