import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.scss']
})
export class RestauranteComponent implements OnInit {

  // declarando as variaveis
  mediaGeral: Array<any> = [];
  ratingArr: Array<number> = [];
  rating: number = 5;
  starCount: number = 5;
  usuario_rating: number = 3;
  usuario_ratingArr: Array<number> = [];
  comentarios_usuarios_ratingArr: Array<number> = [];
  comentario_usuario: any;
  comentarios_usuarios: Array<any> = [
    {
      comentario: 'Realmente ótimo restaurante',
      estrelas: 1,
      comentadoEm: new Date()
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<RestauranteComponent>,
    @Inject(MAT_DIALOG_DATA) public restaurante: any,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  // aqui no ngOnInit é onde a aplicação vai rodar primeiro antes de qualquer outra coisa... 
  ngOnInit(): void {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
    for (let index = 0; index < this.starCount; index++) {
      this.usuario_ratingArr.push(index);
    }
    for (let index = 0; index < this.starCount; index++) {
      this.comentarios_usuarios_ratingArr.push(index);
    }
    this.listarComentarios(this.restaurante.estrelas)
  }

  showIcon(contagem: number, index: number) {
    if (contagem >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onClick(rating: number) {
    this.usuario_rating = rating;
    return false;
  }

  enviarComentario() {
    const comentario = {
      comentario: this.comentario_usuario,
      estrelas: this.usuario_rating,
      comentadoEm: new Date()
    }

    this.comentarios_usuarios.push(comentario)
    this.listarComentarios(this.restaurante.estrelas);
  }

  listarComentarios(param: number) {
    this.mediaGeral = [];
    this.comentarios_usuarios.forEach((comentario: any) => {
      this.mediaGeral.push(comentario.estrelas);
    });
    this.mediaGeral.push(param);
    const sum = this.mediaGeral.reduce((a: number, b: number) => a + b, 0);
    const toDisplay = Math.round(sum/this.mediaGeral.length);
    return this.rating = toDisplay;
  }

}
