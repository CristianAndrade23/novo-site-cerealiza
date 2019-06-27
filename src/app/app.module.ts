import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { ConhecaComponent } from './conheca/conheca.component';
import { BeneficiosComponent } from './beneficios/beneficios.component';
import { DepoimentosComponent } from './depoimentos/depoimentos.component';
import { EquipeComponent } from './equipe/equipe.component';
import { ContatoComponent } from './contato/contato.component';
import { ComeceComponent } from './comece/comece.component';
import {ModalModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    ConhecaComponent,
    BeneficiosComponent,
    DepoimentosComponent,
    EquipeComponent,
    ContatoComponent,
    ComeceComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
