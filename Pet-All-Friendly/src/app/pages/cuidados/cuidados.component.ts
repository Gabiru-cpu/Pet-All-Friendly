import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CuidadoDTO } from '../../models/cuidados-dto-model';
import { CuidadosService } from '../../services/cuidados.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cuidados',
  standalone: true,
  imports: [
    MatCardModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    NgFor,
  ],
  templateUrl: './cuidados.component.html',
  styleUrl: './cuidados.component.scss'
})
export class CuidadosComponent implements OnInit {
  animais: CuidadoDTO[] = [];
  animaisFiltrados: CuidadoDTO[] = [];

  // Paginação
  pageSize = 3;
  currentPage = 0;
  paginatedAnimais: CuidadoDTO[] = [];

  // Filtro
  filtro = '';

  constructor(private cuidadosService: CuidadosService) {}

  ngOnInit(): void {
  this.cuidadosService.getAllCuidados().subscribe({
    next: (cuidados) => {
      this.animais = cuidados;
      this.filtrarAnimais();
      cuidados.forEach(animal => {
        this.buscarImagemDoAnimal(animal.nome); // <- chamada necessária
      });
    },
    error: (err) => {
      console.error('Erro ao buscar cuidados:', err);
    }
  });
}


  // Aplica o filtro e atualiza a paginação
  filtrarAnimais(): void {
  const filtroLower = this.filtro.toLowerCase().trim();
  this.animaisFiltrados = this.animais.filter((animal) =>
    animal.nome.toLowerCase().includes(filtroLower)
  );
  this.atualizarPaginacao();

  // Buscar imagens dos animais filtrados
  this.animaisFiltrados.forEach(animal => {
    if (!this.imagens[animal.nome]) {
      this.buscarImagemDoAnimal(animal.nome);
    }
  });
}


  // Atualiza os animais da página atual
  atualizarPaginacao(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedAnimais = this.animaisFiltrados.slice(start, end);
  }

  // Evento de mudança de página
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.atualizarPaginacao();
  }








    // Map de imagens (nome do animal → URL da imagem)
    imagens: { [nome: string]: string } = {};

  buscarImagemDoAnimal(nome: string): void {
    const termoBusca = this.traducoes[nome.toLowerCase()] || nome;

    this.cuidadosService.buscarImagem(termoBusca).subscribe({
      next: (res) => {
        const imagem = res.photos?.[3] || res.photos?.[2]; // segunda imagem, ou a primeira se não tiver segunda
        if (imagem) {
          this.imagens[nome] = imagem.src.medium;
        } else {
          this.imagens[nome] = 'assets/placeholder.jpg';
        }
      },
      error: (err) => {
        console.warn(`Erro ao buscar imagem para ${nome}`, err);
        this.imagens[nome] = 'assets/placeholder.jpg';
      }
    });
  }



  private traducoes: { [key: string]: string } = {
    'calopsita': 'cockatiel',
    'coelho polonês': 'polish rabbit',
    'coelho europeu': 'european rabbit',
    'jabuti-piranga': 'red-footed tortoise',
    'tucano': 'toucan',
    // Adicione outros aqui se necessário
  };
}
