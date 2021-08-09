import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class filmesService {

  private basePath = '/filmes';

  constructor(
    private _fireStore: AngularFirestore,
    private _fireStorage: AngularFireStorage
  ) { }

  criaFilme(avaliacao: any, fileUpload: any) {
    const filmes = this._fireStore.collection('filmes');
    filmes.add({...avaliacao, downloadUrl: fileUpload}).then(doc => doc.update({ id: doc.id }));
  }

  listarFilmes() {
    return this._fireStore.collection('filmes').valueChanges();
  }

  pushFileToStorage(avaliacao: any, fileUpload: any) {
    const filePath = `${this.basePath}/${fileUpload.name}_${avaliacao.nome}_${new Date()}`;
    const storageRef = this._fireStorage.ref(filePath);
    const uploadTask = this._fireStorage.upload(filePath, fileUpload);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          this.criaFilme(avaliacao, fileUpload.url);
        });
      })
    ).subscribe();
  }

  criaComentarioDousuario(idFilmes: string, idUsuario: string, avaliacao: object) {
    return this._fireStore.collection('filmes')
    .doc(idFilmes).collection('avaliações').doc(idUsuario).set(avaliacao);
  }

  listaComentariosDoFilme(idFilmes: string) {
    return this._fireStore.collection('filmes')
    .doc(idFilmes).collection('avaliações').valueChanges();
  }

  excluirComentario(idFilmes: string, idUsuario: string) {
    return this._fireStore.collection('filmes')
    .doc(idFilmes).collection('avaliações').doc(idUsuario).delete();
  }
  
}
