import { Injectable } from '../../node_modules/@angular/core';
import { Router } from '../../node_modules/@angular/router';
import { Usuario } from './acesso/usuario.model';
import * as fb from 'firebase';

@Injectable()
export class Autenticacao {
  constructor(private router: Router) {}

  public tokenId: string;
  public cadastrarUsuario(usuario: Usuario): void {
    fb.auth()
      .createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((resposta: any) => {
        //remover senha
        delete usuario.senha;
        //adicionar na base de dados
        fb.database()
          .ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set(usuario);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }

  public efetuarLoginUsuario(email: string, senha: string): void {
    fb.auth()
      .signInWithEmailAndPassword(email, senha)
      .then((resposta: any) => {
        fb.auth()
          .currentUser.getIdToken()
          .then((idToken: string) => {
            this.tokenId = idToken;
            localStorage.setItem('idToken', idToken);
            this.router.navigate(['/home']);
          });
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }
  public auteticacao(): boolean {
    /* if (this.tokenId === undefined && localStorage.getItem('idToken') != null) {
      this.tokenId = localStorage.getItem('idToken');
    }*/

    return (
      this.tokenId !== undefined ||
      (this.tokenId === undefined && localStorage.getItem('idToken') != null)
    );
  }

  public sair(): void {
    fb.auth()
      .signOut()
      .then(() => {
        localStorage.removeItem('idToken');
        this.tokenId = undefined;
      });
  }
}
