import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProdutoDTO } from './dto/produto.dto';
import * as XLSX from 'xlsx';

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

    async upload(file: Express.Multer.File, req: Request) {
        const wb = XLSX.readFile(file.path)
        const nomePlanilha = wb.SheetNames[0];
        const planilha = wb.Sheets[nomePlanilha];

        const dados : any = XLSX.utils.sheet_to_json(planilha);
        

        var produtoCadastro
        for(const linha in dados){
            
            const produto = dados[linha].PRODUTO.split(' ')

            if(produto[9]){
                const submercado = produto[2]
                const energia = produto[3]
                const periodicidade = produto[4]
                const dataInicial = produto[5]
                const dataFinal = produto[6]
                const tipo = produto[8]
                
                
                const dataArquivo = {
                    submercado: submercado,
        
                    energia: energia,
        
                    periodicidade: periodicidade,
        
                    dataInicial: dataInicial,
        
                    dataFinal: dataFinal,
        
                    tipo: tipo
                }
    
                produtoCadastro = await this.create(dataArquivo)
                
                
            } else {
                const submercado = produto[2]
                const energia = produto[3]
                const periodicidade = produto[4]
                const dataInicial = produto[5]
                const tipo = produto[7]
    
                const dataArquivo = {
                    submercado: submercado,
        
                    energia: energia,
        
                    periodicidade: periodicidade,
        
                    dataInicial: dataInicial,
        
                    dataFinal: "",
        
                    tipo: tipo
                }
    
                
                produtoCadastro = await this.create(dataArquivo)
                
            }
            

            //Dados Principal

            const dataHora = dados[linha]['DATA/HORA']
            const QN = dados[linha]['Q.N (QUANTIDADE)']
            const UN = dados[linha]['U.N. (UNIDADE)']
            const QM = dados[linha]['Q.M (QUANTIDADE MEDIDA)']
            const UM = dados[linha]['U.M. (UNIDADE MEDIDA)']
            const preco = dados[linha]['PREÇO']
            const contrato = dados[linha]['TIPO DE CONTRATO']
            const tendencia = dados[linha]['TENDÊNCIA']

            const status = dados[linha].STATUS 
            
            const dataPrincipal = {
                dataHora: dataHora,
                
                quantidadeHora: QN.toString(),
                
                unidadeHora: UN,
                
                quantidadeMes: QM.toString(),
                
                unidadeMes: UM,
                
                preco: preco.toString(),
                
                tipoContrato: contrato,
              
                tendencia: tendencia,
                
                status: status,
              
                produtoId: produtoCadastro.id,
            }

            await this.prisma.principal.create({
                data: dataPrincipal
            })
            
        }

        return {message: "Produtos Cadastrados com sucesso"}
    }
}
