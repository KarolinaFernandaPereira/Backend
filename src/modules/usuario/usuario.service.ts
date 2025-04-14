import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginDTO, UserDTO } from './dto/user.dto';

import { File } from 'buffer';

@Injectable()
export class UsuarioService {

    constructor(private prisma:PrismaService){}


    async create(data: UserDTO){
        const res = await this.prisma.usuario.create(
            {
                data: {...data}
            }
        )

        return res
    }

    async login(data: LoginDTO){
        const login = await this.prisma.usuario.findMany({
            where: {
                email: data.email
            }
        })
        const logar = login[0]

        if(!logar){
            return {message: "Usuário não cadastrado"}
        } else {
            if(data.email == logar.email && data.senha == logar.senha){
                return logar
            } 

            return {message: "Dados de login errados"}
        } 
        


    }

    async upload(file: Express.Multer.File, req: Request, id: string) {
        const base = process.cwd()
        
        const url = `http://localhost:3030/files/${file.filename}`

        const user = this.prisma.usuario.update({
            where: {
                id: parseInt(id)
            },

            data: {
                avatar: url
            }
        })


        return user


        
    }
}
