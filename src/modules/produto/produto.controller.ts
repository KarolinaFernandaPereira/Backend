import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoDTO } from './dto/produto.dto';
import { Produto } from '@prisma/client';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}


  @Post('criar')
  criar(@Body() data: ProdutoDTO):Promise<Produto> {
    return this.produtoService.create(data)
  }

  @Get('listar')
  listar():Promise<any> {
    return this.produtoService.getAll()
  }

  @Get('teste')
  teste():Promise<any> {
    return this.produtoService.testeToast()
  }

  @Delete('deletar/:id')
  deletar(@Param('id') id: string):Promise<any> {
    return this.produtoService.delete(id)
  }

}
