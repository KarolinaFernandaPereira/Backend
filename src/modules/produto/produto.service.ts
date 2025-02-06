import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProdutoDTO } from './dto/produto.dto';

@Injectable()
export class ProdutoService {
    constructor(private prisma:PrismaService){}

    async create(data: ProdutoDTO) {

        const teste = parseInt(data.principalId)
        
        const res = await this.prisma.produto.create({
            data: {...data, principalId: teste}
        })

        return res
    }

    async getAll(){
        const res = await this.prisma.produto.findMany()

        return res
    }

    async delete(ID: string){
        

        return await this.prisma.produto.delete({
            where: {
                id: parseInt(ID)
            }
        })


    }
}
