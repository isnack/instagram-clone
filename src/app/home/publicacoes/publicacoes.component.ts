import { Component, OnInit } from '@angular/core';
import { Bd } from './../../bd.service';
import * as fb from 'firebase';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css'],
  providers: [Bd],
})
export class PublicacoesComponent implements OnInit {
  public publicacoes: any;
  public email: string;
  constructor(private bd: Bd) {}

  ngOnInit() {
    fb.auth().onAuthStateChanged(user => {
      this.email = user.email;
      this.atualizarTimeLine();
      console.log(this.email);
    });
  }
  public atualizarTimeLine(): void {
    this.bd.consultaPublicacoes(this.email).then((publicacoes: any) => {
      this.publicacoes = publicacoes;
      console.log(this.publicacoes);
    });
  }
}
