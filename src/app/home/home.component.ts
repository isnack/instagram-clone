import { Component, OnInit, ViewChild } from '@angular/core';
import { Autenticacao } from './../autenticacao.service';
import { PublicacoesComponent } from './publicacoes/publicacoes.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private autenticacao: Autenticacao) {}
  @ViewChild(PublicacoesComponent)
  public publicacoes: PublicacoesComponent;
  ngOnInit() {}

  public sair(): void {
    this.autenticacao.sair();
  }

  public atualizarTimeLine(): void {
    this.publicacoes.atualizarTimeLine();
  }
}
