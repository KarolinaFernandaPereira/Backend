import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { FiltroDTO } from './dto/filtro.dto';

@Injectable()
export class FiltroService {
    constructor(private prisma:PrismaService){}


    async create(data: any) {
        

        const nomeFiltro = data.name
        const contratoFiltro = data.contrato.code
        const filtroAtivo = data.ativo
        
        function concatRegionCode(regions) {
            return regions.map(region => `${region.code}_`).join('');
        }

        const submercadoFiltro = concatRegionCode(data.submercado)
        const tipoFiltro = concatRegionCode(data.tipo)

        const energiaFiltro = concatRegionCode(data.energia)

        const res = await this.prisma.filtro.findMany({
            where: {
                userId: parseInt(data.userId)
            }
        })
        
        var filtroPadrao

        if(res.length != 0){
            
            filtroPadrao = 0
        } else {
            filtroPadrao = 1
        }
        console.log(filtroPadrao)
        
        const filtroUser = data.userId

        const dataIniFiltro = data.dataIni
        const dataFinFiltro = data.dataFin

        const periodicidadeFiltro = data.periodicidade.code

        const finalData = {
            'nome': nomeFiltro,
            'contrato': contratoFiltro,
            'ativo': filtroAtivo,
            'submercado': submercadoFiltro,
            'tipo': tipoFiltro,
            'energia': energiaFiltro,
            'padrao': filtroPadrao,
            'dataInicial': dataIniFiltro,
            'dataFinal': dataFinFiltro,
            'periodicidade': periodicidadeFiltro,
            'userId': filtroUser
        }

        await this.prisma.filtro.create({data: finalData})



        console.log(data)


    }

    async getNome(id: string) {
        const res = await this.prisma.filtro.findMany({
            where: {
                userId: parseInt(id),
            },

            select: {
                nome: true,
                padrao: true,
                id: true
            },


        })

        return res
    }

    async getId(id: string){
        const res = await this.prisma.filtro.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        return res
    }

    async favoritar(id: string){
        const res1 = await this.prisma.filtro.updateMany({
            data: {
                padrao: 0
            }
        })

        const res2 = await this.prisma.filtro.update({
            where: {
                id: parseInt(id)
            },
            data: {
                padrao: 1
            }
            
        })

        

        return res2
    }

    async padrao(id: string){


        if(id.length != 0){

            const res = await this.prisma.filtro.findMany({
                where: {
                    padrao: 1,
                    userId: parseInt(id)
                }
            })

            if(res.length == 0){
                return "Nada Cadastrado"
            }
            
            return res[0]


        } else {

            return 'Nada Cadastrado'
        }

        
    }

    async delete(id: string){
        

        return await this.prisma.filtro.delete({
            where: {
                id: parseInt(id)
            }
        })



    }
}
