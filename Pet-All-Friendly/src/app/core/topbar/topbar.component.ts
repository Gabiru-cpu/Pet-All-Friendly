import { Component, inject, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { LembreteService } from '../../services/lembrete.service'; // <<< importe o serviço!
import { NotificacaoComponent } from '../../shared/notificacao/notificacao.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatBadgeModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, RouterModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnInit {
  userName = "";
  isMobile = false;
  readonly dialog = inject(MatDialog);
  private lembreteService = inject(LembreteService); // <<< injete o serviço aqui
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  unreadNotifications = 0;

  ngOnInit(): void {
    this.checkScreenSize();
    this.loadUnreadNotifications(); // <<< carrega ao iniciar a tela!

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storedName = localStorage.getItem('nomeContaPAF');
      if (storedName) {
        this.userName = storedName;
      }
    }
  }

  private loadUnreadNotifications() {
    this.lembreteService.getAllMyPetsLembretes().subscribe({
      next: (lembretes) => {
        this.unreadNotifications = lembretes.filter(l => !l.seen).length;
      },
      error: (error) => {
        console.error('Erro ao carregar notificações:', error);
      }
    });
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth < 809;
    }
  }

  toggleSidebar(): void {
    this.toggleSidebarEvent.emit();
  }

  openDialog() {
    if (!this.dialog.openDialogs.length) {
      const isMobile = window.innerWidth < 768;
      const dialogRef = this.dialog.open(NotificacaoComponent, {
        width: isMobile ? 'auto' : '400px',
        minWidth: '200px',
        maxWidth: '900vw',
        height: isMobile ? '70vh' : '600px',
        position: { top: '64px', right: isMobile ? '1vw' : '10px' },
        panelClass: 'custom-dialog-with-shadow',
        backdropClass: 'no-backdrop'
      });

      dialogRef.afterClosed().subscribe(() => {
        // Recarrega a contagem depois de fechar o modal
        this.loadUnreadNotifications();
      });
    }
  }

  logout() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem('tokenPAF');
      localStorage.removeItem('nomeContaPAF');
      localStorage.removeItem('emailContaPAF');      
    }
    
    window.location.href = '/login';
  }  
}
