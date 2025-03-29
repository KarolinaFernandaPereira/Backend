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

        const filtroPadrao = data.padrao

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
        }

        await this.prisma.filtro.create({data: finalData})



        console.log(data)


    }

    async getNome() {
        const res = await this.prisma.filtro.findMany({
            select: {
                nome: true
            }
        })

        return res
    }
}
