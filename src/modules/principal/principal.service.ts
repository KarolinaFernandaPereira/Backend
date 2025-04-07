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
                produtoId: 4
            }
        })

        const volumes = res.map(item => parseInt(item.quantidadeHora));

        return volumes
    }

    async volumePrice(filtroA: any) {
        
        const tar = JSON.parse(filtroA.query)

        
        
        

        if(Object.keys(tar).length != 0){
            var submercadoCodes
            var periodicidadeCode
            var tipoCode
            var contrato
            var energiaCode

            if(tar.filtroUse.submercado){
                submercadoCodes = tar.filtroUse.submercado.map(submercado => submercado.code);
            }

            if(tar.filtroUse.periodicidade){
                periodicidadeCode = tar.filtroUse.periodicidade.code;
            }

            if(tar.filtroUse.tipo){
                tipoCode = tar.filtroUse.tipo.map(tipo => tipo.code);
            }

            if(tar.filtroUse.contrato){
                contrato = tar.filtroUse.contrato.code
            }

            if(tar.filtroUse.energia){
                energiaCode = tar.filtroUse.energia.map(energia => energia.code)
            }

            
            console.log(tipoCode)
            const filtrado = await this.prisma.produto.findMany({
                where: {
                    energia: {
                        in: energiaCode
                    },
                    periodicidade: periodicidadeCode,
                    tipo: {
                        in: tipoCode
                    }
                }
            })

            console.log(filtrado)
            
            
            const resID = filtrado.map(item => item.id);

            console.log(resID)
            const res = await this.prisma.principal.findMany({
                select: {
                    preco: true,
                },
    
                where: {
                    produtoId: {
                        in: resID
                    }
                }
               
            })

            var resultado_final : any = []
            const datasUnicas = [...new Set(res.map(r => r.preco))];

            resultado_final = await Promise.all(
                datasUnicas.map( async (item) => {
                    const venda = await this.prisma.principal.findMany({
                        where: {
                            
                            preco: item,
    
                            tendencia: 'Venda'
                            
                        },
                    })  
    
                    const compra = await this.prisma.principal.findMany({
                        where: {
                            
                            preco: item,
    
                            tendencia: 'Compra'
                            
                        },
                    }) 
    
                    
    
                    return {
                        'preco': item,
                        'compra': (await compra).length,
                        'venda': (await venda).length,
                    }
    
                    
                })
            )
    
            return resultado_final
            
        }

        
        const res = await this.prisma.principal.findMany({
            select: {
                preco: true,
            },

            where: {
                produtoId: 5
            }
           
        })

        

        console.log()
        const datasUnicas = [...new Set(res.map(r => r.preco))];

        var resultado_final : any = []
        
        resultado_final = await Promise.all(
            datasUnicas.map( async (item) => {
                const venda = await this.prisma.principal.findMany({
                    where: {
                        
                        preco: item,

                        tendencia: 'Venda'
                        
                    },
                })  

                const compra = await this.prisma.principal.findMany({
                    where: {
                        
                        preco: item,

                        tendencia: 'Compra'
                        
                    },
                }) 

                

                return {
                    'preco': item,
                    'compra': (await compra).length,
                    'venda': (await venda).length,
                }

                
            })
        )

        return resultado_final
    }

    async preco(){
        const res = await this.prisma.principal.findMany({
            select: {
                dataHora: true,
                preco: true
            },
        })

        const datasUnicas = [...new Set(res.map(r => r.dataHora.split(" ")[0]))];
        const precosUnicos = [...new Set(res.map(r => r.preco))];

        var volumes1
        var precos1
        var datasUnicas1

        var resultado_final : any = []
        var testeFinal: any = []
        resultado_final = await Promise.all(
            datasUnicas.map( async (item) => {
                const venda = await this.prisma.principal.findMany({
                    where: {

                        dataHora: {
                            startsWith: item
                        },

                        tendencia: "Venda"

                    },

                    select: {
                        quantidadeHora: true,
                        dataHora: true,
                        preco: true
                    },

                    take: 21
                })  

                console.log(venda)

                var cont = 1
                var vendaFinal: any = []
                


                venda.map((item) => {
                    cont = cont + 1

                    vendaFinal.push(cont);
                    vendaFinal.push(item.preco);
                    vendaFinal.push(parseInt(item.quantidadeHora) * 900000);
                    vendaFinal.push("Venda")

                    testeFinal.push(vendaFinal)

                    vendaFinal = []

                })
                
                cont = 0


            })
        )
        
        
        return testeFinal
    }

    async preco_Compra() {
        const res = await this.prisma.principal.findMany({
            select: {
                dataHora: true,
                preco: true
            },
        })

        const datasUnicas = [...new Set(res.map(r => r.dataHora.split(" ")[0]))];
        const precosUnicos = [...new Set(res.map(r => r.preco))];

        var volumes1
        var precos1
        var datasUnicas1

        var resultado_final : any = []
        var testeFinal: any = []

        resultado_final = await Promise.all(
            datasUnicas.map( async (item) => {
                const venda = await this.prisma.principal.findMany({
                    where: {

                        dataHora: {
                            startsWith: item
                        },

                        tendencia: "Compra"
                    },

                    select: {
                        quantidadeHora: true,
                        dataHora: true,
                        preco: true
                    },
                    take: 21
                })  

                console.log(venda)

                var cont = 1
                var vendaFinal: any = []
                


                venda.map((item) => {
                    cont = cont + 1
                    vendaFinal.push(cont);
                    vendaFinal.push(item.preco);
                    vendaFinal.push(parseInt(item.quantidadeHora) * 900000);
                    vendaFinal.push("Compra")

                    testeFinal.push(vendaFinal)

                    vendaFinal = []

                })

                cont = 0



            })
        )
        
        
        return testeFinal
    }
}
