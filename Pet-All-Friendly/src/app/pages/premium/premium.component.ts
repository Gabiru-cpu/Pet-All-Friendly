import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-premium',
  imports: [MatIcon, CommonModule],
  templateUrl: './premium.component.html',
  styleUrl: './premium.component.scss'
})
export class PremiumComponent {
  benefits = [
    'Acesso ilimitado a recursos exclusivos',
    'Suporte prioritário 24/7',
    'Experiência sem anúncios',
    'Backup automático e armazenamento extra',
    'Novos recursos antes de todo mundo'
  ];

  purchasePremium() {
    alert('Redirecionando para o pagamento...');
  }
}
