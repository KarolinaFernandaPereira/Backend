import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrincipalService } from './principal.service';
import { PrincipalDTO } from './dto/principal.dto';
import { Principal } from '@prisma/client';

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

}
