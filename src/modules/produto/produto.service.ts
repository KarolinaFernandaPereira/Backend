import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProdutoDTO } from './dto/produto.dto';

@Injectable()
export class ProdutoService {
    constructor(private prisma:PrismaService){}

    async create(data: ProdutoDTO) {

        const res = await this.prisma.produto.create({
            data: {...data}
        })

        return res
    }

    async getAll(){
        const res = await this.prisma.produto.findMany()

        return res
    }

    async testeToast(){
        return "Brabo"
    }

    async delete(ID: string){
        

        return await this.prisma.produto.delete({
            where: {
                id: parseInt(ID)
            }
        })


    }
}
