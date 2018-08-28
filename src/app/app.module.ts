import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';

import { AutenticacaoGuard } from './autenticacao-guard.service';
import { Autenticacao } from './autenticacao.service';
import { Progresso } from './progresso.service';

import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { CadastroComponent } from './Acesso/cadastro/cadastro.component';
import { BannerComponent } from './Acesso/banner/banner.component';
import { LoginComponent } from './Acesso/login/login.component';
import { HomeComponent } from './home/home.component';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component';
import { IncluirPublicacaoComponent } from './home/incluir-publicacao/incluir-publicacao.component';

@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    CadastroComponent,
    BannerComponent,
    LoginComponent,
    HomeComponent,
    PublicacoesComponent,
    IncluirPublicacaoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [Autenticacao, AutenticacaoGuard, Progresso],
  bootstrap: [AppComponent],
})
export class AppModule {}
