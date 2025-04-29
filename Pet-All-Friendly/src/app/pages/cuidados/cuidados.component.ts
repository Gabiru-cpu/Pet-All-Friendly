import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-cuidados',
  standalone: true,
  imports: [MatCardModule, NgFor],
  templateUrl: './cuidados.component.html',
  styleUrl: './cuidados.component.scss'
})
export class CuidadosComponent {
  animais = [
    {
      nome: 'Arara-azul',
      nomeCientifico: 'Anodorhynchus hyacinthinus',
      alimentacao: 'Frutos de palmeiras, sementes e nozes.',
      habitat: 'Pantanal, Cerrado e Florestas tropicais do Brasil.',
      licenciamento: 'Necessário autorização do IBAMA e cadastro no SISFAUNA para manutenção em cativeiro.',
      cuidadosGerais: 'Necessita de espaço amplo para voo, socialização com outras aves e manejo veterinário especializado.',
      imagem: 'https://ciclovivo.com.br/wp-content/uploads/2023/03/arara-azul-casal-1024x682.jpg'
    },
    {
      nome: 'Tatu-bola',
      nomeCientifico: 'Tolypeutes tricinctus',
      alimentacao: 'Insetos, frutas e pequenos vertebrados.',
      habitat: 'Caatinga e Cerrado brasileiros.',
      licenciamento: 'É uma espécie ameaçada, protegida por legislação federal. A criação só é permitida em projetos de conservação autorizados.',
      cuidadosGerais: 'Necessita de ambiente simulado natural, alimentação variada e controle de parasitas.',
      imagem: 'assets/imagens/arara-azul.jpg'
    },
    {
      nome: 'Mico-leão-dourado',
      nomeCientifico: 'Leontopithecus rosalia',
      alimentacao: 'Frutas, insetos, pequenos vertebrados e néctar.',
      habitat: 'Florestas tropicais do Rio de Janeiro.',
      licenciamento: 'Apenas instituições de pesquisa e conservação credenciadas podem mantê-los.',
      cuidadosGerais: 'Necessita de enriquecimento ambiental constante e interação social com outros micos.',
      imagem: 'assets/imagens/arara-azul.jpg'
    }
  ];
}
