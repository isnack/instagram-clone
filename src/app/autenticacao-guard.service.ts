import { Injectable } from '../../node_modules/@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Autenticacao } from './autenticacao.service';

@Injectable()
export class AutenticacaoGuard implements CanActivate {
  constructor(private autenticacao: Autenticacao, private router: Router) {}
  canActivate() {
    if (this.autenticacao.auteticacao()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
