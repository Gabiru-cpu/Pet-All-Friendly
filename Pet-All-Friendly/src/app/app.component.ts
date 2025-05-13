import { Component, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd, RouterOutlet, RouterModule } from '@angular/router';
import { FooterComponent } from "./core/footer/footer.component";
import { TopbarComponent } from './core/topbar/topbar.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet, TopbarComponent, MatSidenavModule, MatIconModule, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  showTopbar: boolean = true;
  showFooter: boolean = true;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(Router) private router: Router
  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.showTopbar = this.router.url !== '/'; // Esconde a Topbar na rota '/'
      this.showFooter = this.router.url !== '/'; // Esconde o Footer na rota '/'
  
      if (this.router.url !== '/') {

        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
          const nome = localStorage.getItem('nomeContaPAF');
          const email = localStorage.getItem('emailContaPAF');
          
          if (nome && email) {
            this.user.name = nome;
            this.user.email = email;
          }

        }


        
      }
    });
  }
  

  user = {
    name: 'Douglas Silva',
    email: 'Douglassilva@email.com'
  };

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('resize', this.onResize.bind(this));
      this.onResize();
    }
  }

  onResize(): void {
    if (isPlatformBrowser(this.platformId) && window.innerWidth >= 768) {
      this.sidenav.close();
    }
  }

  toggleSidebar(): void {
    this.sidenav.toggle();
  }

  logout() {

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem('tokenPAF');
      localStorage.removeItem('nomeContaPAF');
      localStorage.removeItem('emailContaPAF');
    }
    
    window.location.href = '/';
  }  
}
