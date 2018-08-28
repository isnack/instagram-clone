import { Injectable } from '../../node_modules/@angular/core';
import * as fb from 'firebase';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd {
  constructor(private progresso: Progresso) {}

  public publicar(publicacao: any): void {
    fb.database()
      .ref(`publicacoes/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo })
      .then((resposta: any) => {
        let nomeImagem = resposta.key;

        fb.storage()
          .ref()
          .child(`imagens/${nomeImagem}`)
          .put(publicacao.imagem)
          .on(
            fb.storage.TaskEvent.STATE_CHANGED,
            (snapshot: any) => {
              this.progresso.status = 'andamento';
              this.progresso.estado = snapshot;
            },
            error => {
              this.progresso.status = 'erro';
            },
            () => {
              this.progresso.status = 'concluido';
            },
          );
      });
  }

  public consultaPublicacoes(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      fb.database()
        .ref(`publicacoes/${btoa(email)}`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {
          let publicacoes: Array<any> = [];

          snapshot.forEach((childSnapshot: any) => {
            let publicacao = childSnapshot.val();
            publicacao.key = childSnapshot.key;

            publicacoes.push(publicacao);
          });
          return publicacoes.reverse();
        })
        .then((publicacoes: any) => {
          publicacoes.forEach((publicacao: any) => {
            fb.storage()
              .ref()
              .child(`imagens/${publicacao.key}`)
              .getDownloadURL()
              .then((url: string) => {
                publicacao.url_imagem = url;

                fb.database()
                  .ref(`usuario_detalhe/${btoa(email)}`)
                  .once('value')
                  .then((snapshot: any) => {
                    publicacao.nome_usuario = snapshot.val().nome_usuario;
                  });
              });
          });
          console.log(publicacoes);
          resolve(publicacoes);
        });
    });
  }
}
