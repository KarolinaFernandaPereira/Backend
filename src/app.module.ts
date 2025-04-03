import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from './modules/produto/produto.module';
import { PrincipalModule } from './modules/principal/principal.module';
import { FiltroModule } from './modules/filtro/filtro.module';
import { UsuarioModule } from './modules/usuario/usuario.module';

@Module({
  imports: [ProdutoModule, PrincipalModule, FiltroModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
