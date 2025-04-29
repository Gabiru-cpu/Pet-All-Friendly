import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MeusPetsComponent } from './pages/meus-pets/meus-pets.component';
import { PremiumComponent } from './pages/premium/premium.component';
import { HospitaisComponent } from './pages/hospitais/hospitais.component';
import { PetShopsComponent } from './pages/pet-shops/pet-shops.component';
import { AuthGuard } from './guard/auth.guard';
import { CuidadosComponent } from './pages/cuidados/cuidados.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'meus-pets', component: MeusPetsComponent, canActivate: [AuthGuard] },
  { path: 'cuidados', component: CuidadosComponent, canActivate: [AuthGuard] },
  { path: 'hospitais', component: HospitaisComponent, canActivate: [AuthGuard] },
  { path: 'petshops', component: PetShopsComponent, canActivate: [AuthGuard] },
  { path: 'premium', component: PremiumComponent, canActivate: [AuthGuard] },
];
