import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Autenticacao } from './../../autenticacao.service';
import { Usuario } from '../usuario.model';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  @Output()
  public exibirLogin: EventEmitter<boolean> = new EventEmitter<boolean>();
  public formulario: FormGroup;
  constructor(
    private formsBuilder: FormBuilder,
    private autenticacao: Autenticacao,
  ) {
    this.formulario = formsBuilder.group({
      email: [''],
      nome_completo: [''],
      usuario: [''],
      senha: [''],
    });
  }

  ngOnInit() {}
  public exibirPainelLogin(): void {
    this.exibirLogin.emit(false);
  }
  public cadastrarUsuario(): void {
    let usuario: Usuario = new Usuario(
      this.formulario.value.nome_completo,
      this.formulario.value.email,
      this.formulario.value.usuario,
      this.formulario.value.senha,
    );
    this.autenticacao.cadastrarUsuario(usuario);
    console.log(usuario);
  }
}
