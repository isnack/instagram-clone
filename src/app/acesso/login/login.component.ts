import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Autenticacao } from '../../autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formularioLogin: FormGroup;
  constructor(
    private formsBuilder: FormBuilder,
    private autenticaoService: Autenticacao,
  ) {
    this.formularioLogin = formsBuilder.group({
      email: [''],
      senha: [''],
    });
  }
  @Output()
  public exibirCadastro: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {}
  public exibirPainelCadastro(): void {
    this.exibirCadastro.emit(true);
    console.log(this.exibirCadastro);
  }
  public efetuarLoginUsuario(): void {
    this.autenticaoService.efetuarLoginUsuario(
      this.formularioLogin.value.email,
      this.formularioLogin.value.senha,
    );
  }
}
