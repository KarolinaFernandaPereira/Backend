import { Module } from '@nestjs/common';
import { PrincipalService } from './principal.service';
import { PrincipalController } from './principal.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PrincipalController],
  providers: [PrincipalService, PrismaService],
})

export class PrincipalModule {}
