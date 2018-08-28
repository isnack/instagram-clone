import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, interval, observable, Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as fb from 'firebase';

import { Bd } from './../../bd.service';
import { Progresso } from './../../progresso.service';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css'],
  providers: [Bd],
})
export class IncluirPublicacaoComponent implements OnInit {
  @Output()
  public atualizarTimeLine: EventEmitter<any> = new EventEmitter();
  public email: string;
  public imagem: any;
  public progressoPublicacao: string = 'pendente';
  public porcentagemUpload: number;
  public formulario: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private bd: Bd,
    private progresso: Progresso,
  ) {
    this.formulario = formBuilder.group({
      titulo: '',
    });
  }

  ngOnInit() {
    fb.auth().onAuthStateChanged(user => {
      this.email = user.email;
    });
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0],
    });

    let continua = new Subject();
    continua.next(true);

    let acompanhamentoUpload = interval(1500)
      .pipe(takeUntil(continua))
      .subscribe(() => {
        console.log(this.progresso.status);
        this.progressoPublicacao = 'andamento';
        this.porcentagemUpload = Math.round(
          (this.progresso.estado.bytesTransferred /
            this.progresso.estado.totalBytes) *
            100,
        );

        if (this.progresso.status == 'concluido') {
          this.progressoPublicacao = 'concluido';
          this.atualizarTimeLine.emit();
          continua.next(false);
        }
      });
  }
  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files;
  }
}
