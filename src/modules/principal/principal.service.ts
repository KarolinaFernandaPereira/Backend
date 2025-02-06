import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PrincipalDTO } from './dto/principal.dto';
import { parse } from 'date-fns';
import { partition } from 'rxjs';

@Injectable()
export class PrincipalService {
    constructor(private prisma:PrismaService){}

    async create(data: PrincipalDTO) {
       
        
        

        const res = await this.prisma.principal.create({
            data: data
        })
    
        return res
    }

    async getAll() {
        const res = await this.prisma.principal.findMany()

        return res
    }
}
