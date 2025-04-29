import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-modal-pet',
  templateUrl: './modal-pet.component.html',
  styleUrl: './modal-pet.component.scss',
  imports: [CommonModule, MatButtonModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule ],
  standalone: true
})
export class ModalPetComponent {
  petName: string = '';
  petSpecie: string = '';
  petBreed: string = '';
  petAge: number | null = null;
  petWeight: number | null = null;
  petHeight: number | null = null;
  petGender: string = '';
  petMicrochip: string = '';
  petVaccines: string = '';
  petPhotoUrl: string = '';
  fileError: string | null = null;
  selectedFileName: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<ModalPetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: 'edit' | 'delete' | 'create'; pet?: any }
  ) {
    if (data.pet && (data.action === 'edit' || data.action === 'delete')) { 
      this.petName = data.pet.name || '';
      this.petSpecie = data.pet.specie || '';
      this.petBreed = data.pet.race || '';
      this.petAge = data.pet.age || null;
      this.petWeight = data.pet.weight || null;
      this.petHeight = data.pet.height || null;
      this.petGender = data.pet.sexo ? 'Macho' : 'Fêmea';
      this.petMicrochip = data.pet.microchip ? 'Sim' : 'Não';
      this.petVaccines = data.pet.vaccines || '';
      this.petPhotoUrl = data.pet?.image || '';

    }
  }
  

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.data.action === 'delete') {
      // Para delete, só confirma, sem passar um pet
      this.dialogRef.close({
        confirmed: true,
        action: this.data.action
      });
    } else {
      // Para edit ou create, manda o pet
      this.dialogRef.close({
        confirmed: true,
        action: this.data.action,
        pet: {
          nome: this.petName,
          especie: this.petSpecie,
          raca: this.petBreed,
          idade: this.petAge,
          peso: this.petWeight,
          altura: this.petHeight,
          sexo: this.petGender === 'Macho',
          microchip: this.petMicrochip === 'Sim',
          vacinas: this.petVaccines ? this.petVaccines.split(',').map(v => v.trim()) : [],
          imageData: this.petPhotoUrl?.replace(/^data:image\/[^;]+;base64,/, '')
        }
      });
    }
  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
  
    const file = input.files[0];
  
    if (file.size > 2 * 1024 * 1024) {
      this.fileError = 'A imagem deve ter no máximo 2MB.';
      return;
    }
  
    if (!file.type.match('image/jpeg')) {
      this.fileError = 'A imagem deve ser um arquivo JPG.';
      return;
    }

    this.selectedFileName = file.name;
  
    const reader = new FileReader();
    reader.onload = () => {
      this.petPhotoUrl = reader.result as string;
      this.fileError = null;
    };
    reader.onerror = () => {
      this.fileError = 'Erro ao ler o arquivo.';
    };
    reader.readAsDataURL(file);
  }
  
}
