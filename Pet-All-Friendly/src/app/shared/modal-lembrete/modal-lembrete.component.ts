import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PetService } from '../../services/pet.service';
import { PetDTO } from '../../models/pet-dto-model';

@Component({
  selector: 'app-modal-lembrete',
  templateUrl: './modal-lembrete.component.html',
  styleUrl: './modal-lembrete.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ]
})
export class ModalLembreteComponent implements OnInit {
  lembreteTitulo: string = '';
  lembreteDescricao: string = '';
  lembreteDataHora: string = '';
  lembretePetId: string = '';

  pets: PetDTO[] = []; // Aqui vamos guardar os pets

  constructor(
    public dialogRef: MatDialogRef<ModalLembreteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: 'create' | 'edit' | 'delete'; lembrete?: any },
    private petService: PetService // Injeta o PetService
  ) {
    if (data.lembrete && (data.action === 'edit' || data.action === 'delete')) {
      this.lembreteTitulo = data.lembrete.title || '';
      this.lembreteDescricao = data.lembrete.body || '';
      this.lembreteDataHora = data.lembrete.date || '';
      this.lembretePetId = data.lembrete.pet?.id || '';
    }
  }

  ngOnInit() {
    this.loadPets();
  }

  loadPets() {
    this.petService.getMyPets().subscribe({
      next: (pets) => {
        this.pets = pets;
      },
      error: (err) => {
        console.error('Erro ao carregar pets:', err);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.data.action === 'delete') {
      this.dialogRef.close({
        confirmed: true,
        action: this.data.action
      });
    } else {
      this.dialogRef.close({
        confirmed: true,
        action: this.data.action,
        lembrete: {
          titulo: this.lembreteTitulo,
          descricao: this.lembreteDescricao,
          dataHora: this.lembreteDataHora,
          petId: this.lembretePetId
        }
      });
    }
  }
}
