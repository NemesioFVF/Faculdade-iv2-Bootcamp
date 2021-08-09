import { NovoFilme } from '../novo-filme/novo-filme.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilmeComponent } from '../filme/filme.component';
import { filmesService } from '../shared/filmes.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})
export class FilmesComponent implements OnInit {

  toSearch: any = '';
  siglas: Array<any> = [];
  filmes: Array<any> = [];
  usuarioLogado: any;

  constructor(
    private dialog: MatDialog,
    private _filmesService: filmesService,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.listarFilmes();
    
    this._authService.user$
    .subscribe(userInfos => {
      this.usuarioLogado = userInfos;
    });
  }

  async listarFilmes() {
    await this._filmesService.listarFilmes()
    .subscribe(rests => {
      this.filmes = rests.map(rest => rest);
      this.filmes = this.filmes.sort((a, b) => b.criadoEm.seconds - a.criadoEm.seconds);
    });
  }

  novoFilme(){
    this.dialog.open(NovoFilme, {
      width: '80%',
      height: 'max-content',
      data: {
        usuario: this.usuarioLogado,
        siglas: this.siglas
      }
    });
  }

  sair() {
    this._authService.sair();
  }

  abrirFilme(filme: any) {
    this.dialog.open(FilmeComponent, {
      width: "80%",
      height: "98vh",
      data: filme,
      panelClass: "custom-dialog-container"
    })
  }

}
