import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PetService } from '../../services/pet.service';
import { PetDTO } from '../../models/pet-dto-model';
import { ModalPetComponent } from '../../shared/modal-pet/modal-pet.component';

@Component({
  selector: 'app-meus-pets',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './meus-pets.component.html',
  styleUrl: './meus-pets.component.scss'
})
export class MeusPetsComponent implements OnInit {
  pets: any[] = [];
  selectedPet: any = null;

  constructor(
    private petService: PetService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadMyPets();
  }

  loadMyPets() {
    this.petService.getMyPets().subscribe({
      next: (petsFromApi: PetDTO[]) => {
        this.pets = petsFromApi.map(pet => ({
          id: pet.id,
          name: pet.nome,
          age: pet.idade,
          species: pet.especie,
          race: pet.raca || 'Não informado',
          weight: pet.peso ?? 'Não informado',
          height: pet.altura ?? 'Não informado',
          gender: pet.sexo !== undefined ? (pet.sexo ? 'Macho' : 'Fêmea') : 'Não informado',
          microchip: pet.microchip !== undefined ? (pet.microchip ? 'Sim' : 'Não') : 'Não informado',
          vaccines: pet.vacinas?.length ? pet.vacinas.join(', ') : 'Não informado',
          image: pet.imageData ? `data:image/jpeg;base64,${pet.imageData}` : 'assets/default-pet.png',
          owner: pet.dono ? pet.dono.nome : 'Sem dono'
        }));
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao carregar pets:', error);
      }
    });
  }

  selectPet(pet: any) {
    this.selectedPet = pet;
  }

  registerNewPet() {
    const dialogRef = this.dialog.open(ModalPetComponent, {
      width: '35vw',
      height: '75vh',
      maxWidth: 'none',
      data: { action: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.confirmed && result.action === 'create') {
        const newPet = result.pet;
        this.petService.createPet(newPet).subscribe({
          next: () => {
            console.log('Novo pet cadastrado com sucesso!');
            this.loadMyPets();
          },
          error: (error) => {
            console.error('Erro ao cadastrar pet:', error);
          }
        });
      }
    });
  }

  editPet(pet: any) {
    const dialogRef = this.dialog.open(ModalPetComponent, {
      width: '35vw',
      height: '75vh',
      maxWidth: 'none',
      data: { action: 'edit', pet }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result?.confirmed && result.action === 'edit') {
        const updatedPet = result.pet;
        this.petService.updatePet(pet.id, updatedPet).subscribe({
          next: () => {
            console.log('Pet atualizado com sucesso!');
          },
          error: (error) => {
            console.error('Erro ao atualizar pet:', error);
          }
        }).add(() => {
          this.loadMyPets();
        });
      }
    });
  }
  

  deletePet(pet: any) {
    this.dialog.open(ModalPetComponent, {
      width: '35vw',
      height: '30vh',
      data: { action: 'delete', pet }
    }).afterClosed().subscribe(result => {
      if (result?.action === 'delete') {
        this.petService.deletePet(pet.id).subscribe({
          next: () => {
            console.log('Pet deletado com sucesso');
          },
          error: (error) => {
            console.error('Erro ao deletar pet:', error);
          }
        }).add(() => {
          this.loadMyPets();
        });
      }
    });
  }
  
}
