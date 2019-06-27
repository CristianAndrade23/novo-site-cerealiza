import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beneficios',
  templateUrl: './beneficios.component.html',
  styleUrls: ['./beneficios.component.css']
})
export class BeneficiosComponent implements OnInit {

  simplificar = true;
  analisar = false;
  planejar = false;
  orientar = false;

  constructor() { }

  ngOnInit() {
  }

  mostra(conteudo){
    this.simplificar = false;
    this.analisar = false;
    this.planejar = false;
    this.orientar = false;

    if (conteudo === 'simplificar') {
      this.simplificar = true;
    }
    if (conteudo === 'analisar') {
      this.analisar = true;
    }
    if (conteudo === 'planejar') {
      this.planejar = true;
    }
    if (conteudo === 'orientar') {
      this.orientar = true;
    }
}
}
