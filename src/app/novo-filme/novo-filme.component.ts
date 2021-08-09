import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filmesService } from '../shared/filmes.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-novo-filme',
  templateUrl: './novo-filme.component.html',
  styleUrls: ['./novo-filme.component.scss']
})
export class NovoFilme implements OnInit {

  selectedFile: any;
  currentFileUpload: any;
  siglas: Array<any> = [];
  rating: number = 3;
  starCount: number = 5;
  ratingArr: Array<number> = [];

    foods: Food[] = [
      {value: 'Ação',                viewValue: 'Ação'},
      {value: 'Animação',              viewValue: 'Animação'},
      {value: 'Aventura',              viewValue: 'Aventura'},
      {value: 'Chanchada',             viewValue: 'Chanchada'},
      {value: 'Comédia',               viewValue: 'Comédia'},
      {value: 'Comédia Romântica',     viewValue: 'Comédia romântica'},
      {value: 'Comédia Dramática',     viewValue: 'Comédia dramática'},
      {value: 'Cult',                  viewValue: 'Cult'},
      {value: 'Documentários',         viewValue: 'Documentários'},
      {value: 'Espionagem',            viewValue: 'Espionagem'},
      {value: 'Fantasia',              viewValue: 'Fantasia'},
      {value: 'Faroeste (ou western)', viewValue: 'Faroeste (ou western)'},
      {value: 'Guerra',                viewValue: 'Guerra'},
      {value: 'Musical',               viewValue: 'Musical'},
      {value: 'Policial',              viewValue: 'Policial'},
      {value: 'Romance',               viewValue: 'Romance'},
      {value: 'Suspense',              viewValue: 'Suspense'},
      {value: 'Terror (ou horror)',    viewValue: 'Terror (ou horror)'},
    ];
  
  novoFilme = new FormGroup({
    nome: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    genero: new FormControl('', Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<NovoFilme>,
    private _filmesService: filmesService,
  ) { }

  ngOnInit(): void {
    this.siglas = this.data.siglas;
    for(let index = 0; index < this.starCount; index++){
      this.ratingArr.push(index);
    }
  }

  onClick(rating: number) {
    this.rating = rating;
    return false;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onFileSelect(e: any) {
    if (e.target.files && e.target.files[0]) {
      this.currentFileUpload = e.target.files[0];
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = (ev) => {
        if (ev.target) {
          this.selectedFile = ev.target.result;
        }
      }
    }
  }

  salvarFilme(){
    const avaliacao = {
      nome: this.novoFilme.value.nome,
      descricao: this.novoFilme.value.descricao,
      autorPost: this.data.usuario,
      genero: this.novoFilme.value.genero,
      criadoEm: new Date(),
      estrelas: this.rating
    }

    if (this.selectedFile) {
      this._filmesService.pushFileToStorage(avaliacao, this.currentFileUpload);
    } else {
      alert('Parece que não foi inserido nenhum arquivo de imagem.');
    }

    this.dialogRef.close();
  }

}
