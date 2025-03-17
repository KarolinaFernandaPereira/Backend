import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PrincipalDTO } from './dto/principal.dto';
import { parse } from 'date-fns';
import { partition } from 'rxjs';

@Injectable()
export class PrincipalService {
    constructor(private prisma:PrismaService){}

    async create(data: PrincipalDTO) {
       
        
        const teste = parseInt(data.produtoId)

        const res = await this.prisma.principal.create({
            data: {...data, produtoId: teste}
        })
    
        return res
    }

    async getAll() {
        const res = await this.prisma.principal.findMany()
        return res
    }

    async volume() {
        const res = await this.prisma.principal.findMany({
            select: {
                dataHora: true,
            },
            distinct: ["dataHora"],
        })

        const datasUnicas = [...new Set(res.map(r => r.dataHora.split(" ")[0]))];

        var resultado_final : any = []

        resultado_final = await Promise.all(
            datasUnicas.map( async (item) => {
                const res1 = await this.prisma.principal.findMany({
                    where: {
                        
                        dataHora: {
                            startsWith: item
                        },
                        
                    },
                })  

                return {
                    'data': item,
                    'count': (await res1).length
                }

                
            })
        )
        
        return resultado_final
        
        
    }

    async agressao() {
        const res = await this.prisma.principal.findMany({
            select: {
                dataHora: true,
            },
            distinct: ["dataHora"],
        })

        const datasUnicas = [...new Set(res.map(r => r.dataHora.split(" ")[0]))];

        var resultado_final : any = []

        resultado_final = await Promise.all(
            datasUnicas.map( async (item) => {
                const venda = await this.prisma.principal.findMany({
                    where: {
                        
                        dataHora: {
                            startsWith: item
                        },

                        tendencia: 'Venda'
                        
                    },
                })  

                const compra = await this.prisma.principal.findMany({
                    where: {
                        
                        dataHora: {
                            startsWith: item
                        },

                        tendencia: 'Compra'
                        
                    },
                }) 

                return {
                    'data': item,
                    'venda': (await venda).length,
                    'compra': (await compra).length
                }

                
            })
        )

        return resultado_final
    }

    async getAll_V2() {
        const res = await this.prisma.principal.findMany({
            where: {
                produtoId: 2
            }
        })

        return res
    }

    async distribuicao_volume() {
        const res = await this.prisma.principal.findMany({
            select: {
                dataHora: true,
            },
            where: {
                produtoId: 3
            }
        })
        
        const datasUnicas = [...new Set(res.map(r => r.dataHora.split(" ")[1]))];

        var resultado_final : any = []
        
        resultado_final = await Promise.all(
            datasUnicas.map( async (item) => {
                const venda = await this.prisma.principal.findMany({
                    where: {
                        
                        dataHora: {
                            endsWith: item
                        },

                    },
                    
                    select: {
                        quantidadeHora: true
                    }
                })  

                const volumes = venda.map(item => parseInt(item.quantidadeHora));

                return {
                    'data': item,
                    'volume': volumes,
                }

                
            })
        )
        return resultado_final
    }

    async distribuicao_compra() {
        const res = await this.prisma.principal.findMany({
            select: {
                dataHora: true,
            },
            where: {
                produtoId: 3
            }
        })
        
        const datasUnicas = [...new Set(res.map(r => r.dataHora.split(" ")[1]))];

        var resultado_final : any = []

        resultado_final = await Promise.all(
            datasUnicas.map( async (item) => {
                const venda = await this.prisma.principal.findMany({
                    where: {
                        
                        dataHora: {
                            endsWith: item
                        },
                        
                        tendencia: "Venda"
                    },
                    
                    select: {
                        quantidadeHora: true
                    }
                })  

                const compra = await this.prisma.principal.findMany({
                    where: {
                        
                        dataHora: {
                            endsWith: item
                        },
                        
                        tendencia: "Compra"
                    },
                    
                    select: {
                        quantidadeHora: true
                    }
                })  

                const venda1 = venda.reduce((total, item) => total + parseInt(item.quantidadeHora, 10), 0);
                const compra1 = compra.reduce((total, item) => total + parseInt(item.quantidadeHora, 10), 0);
                

                return {
                    'data': item,
                    'compra': compra1,
                    'venda': venda1
                }

                
            })
        )

        return resultado_final
    }

    async bloxPlot() {
        const res = await this.prisma.principal.findMany({
            select: {
                quantidadeHora: true,
            },
            where: {
                produtoId: 1
            }
        })

        const volumes = res.map(item => parseInt(item.quantidadeHora));

        return volumes
    }
}
