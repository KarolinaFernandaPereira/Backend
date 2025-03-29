import { Module } from '@nestjs/common';
import { FiltroService } from './filtro.service';
import { FiltroController } from './filtro.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FiltroController],
  providers: [FiltroService, PrismaService],
})
export class FiltroModule {}
