import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { LembreteService } from '../../services/lembrete.service';
import { ModalLembreteComponent } from '../modal-lembrete/modal-lembrete.component';

@Component({
  selector: 'app-notificacao',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatIcon
  ],
  templateUrl: './notificacao.component.html',
  styleUrl: './notificacao.component.scss'
})
export class NotificacaoComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<NotificacaoComponent>);
  private lembreteService = inject(LembreteService);
  private dialog = inject(MatDialog);

  notificationList: any[] = [];
  unreadNotifications: number = 0;

  // Contagem automática de notificações não lidas DEVE SER CORRIGIDO
//unreadNotifications: number = this.notificationList.filter(n => !n.seen).length;

  ngOnInit(): void {
    this.loadLembretes();

    
  }

  loadLembretes() {
    this.lembreteService.getAllMyPetsLembretes().subscribe({
      next: (lembretes) => {
        this.notificationList = lembretes.map(lembrete => ({
          id: lembrete.id,
          pet: { id: lembrete.petId, name: lembrete.petNome },
          title: lembrete.titulo,
          body: lembrete.descricao,
          date: new Date(lembrete.dataHora).toISOString().slice(0, 16),
          seen: false
        }));

        this.unreadNotifications = this.notificationList.filter(n => !n.seen).length;
      },
      error: (error) => {
        console.error('Erro ao carregar lembretes:', error);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  criarLembrete(): void {
    const dialogRef = this.dialog.open(ModalLembreteComponent, {
      width: '400px',
      height: '500px',
      disableClose: true,
      data: {
        action: 'create'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.confirmed) {
        const lembrete = {
          titulo: result.lembrete.titulo,
          descricao: result.lembrete.descricao,
          dataHora: result.lembrete.dataHora,
          petId: result.lembrete.petId,
          seen: true
        };
        this.lembreteService.createLembrete(lembrete).subscribe({
          next: () => {
            this.loadLembretes();
          },
          error: (error) => {
            console.error('Erro ao atualizar pet:', error);
          }
        }).add(() => {
          this.loadLembretes();
        });
      }
    });
  }

  editarLembrete(lembrete: any): void {
    const dialogRef = this.dialog.open(ModalLembreteComponent, {
      width: '400px',
      height: '500px',
      disableClose: true,
      data: {
        action: 'edit',
        lembrete
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.confirmed) {
        const lembreteAtualizado = {
          titulo: result.lembrete.titulo,
          descricao: result.lembrete.descricao,
          dataHora: result.lembrete.dataHora,
          petId: result.lembrete.petId,
          seen: lembrete.seen
        };        
        this.lembreteService.updateLembrete(lembrete.id, lembreteAtualizado).subscribe({
          next: () => {
            this.loadLembretes();
          },
          error: (error) => {
            console.error('Erro ao atualizar pet:', error);
          }
        }).add(() => {
          this.loadLembretes();
        });
      }
    });
  }

  deletarLembrete(lembrete: any): void {
    const dialogRef = this.dialog.open(ModalLembreteComponent, {
      width: '400px',
      disableClose: true,
      data: {
        action: 'delete',
        lembrete
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.confirmed) {
        this.lembreteService.deleteLembrete(lembrete.id).subscribe({
          next: () => {
            this.loadLembretes();
          },
          error: (error) => {
            console.error('Erro ao atualizar pet:', error);
          }
        }).add(() => {
          this.loadLembretes();
        });
      }
    });
  }

}
