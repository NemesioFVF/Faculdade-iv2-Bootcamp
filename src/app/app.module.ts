import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// importes do Angular Material, sempre que for usar um elemento do Material 
// devemos colocar os imports e referencia-lo no NgModule para usar as como um tag.

import { MatCardModule } from '@angular/material/card';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltroRestaurantePipe } from './shared/filtro-restaurante.pipe';
import { RestauranteComponent } from './restaurante/restaurante.component';
import { NovoRestauranteComponent } from './novo-restaurante/novo-restaurante.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantesComponent,
    FiltroRestaurantePipe,
    RestauranteComponent,
    NovoRestauranteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    //Forms
    ReactiveFormsModule,
    FormsModule,

    // Angular Material
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
