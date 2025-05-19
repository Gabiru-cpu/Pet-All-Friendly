import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MeusPetsComponent } from './pages/meus-pets/meus-pets.component';
import { HospitaisComponent } from './pages/hospitais/hospitais.component';
import { PetShopsComponent } from './pages/pet-shops/pet-shops.component';
import { AuthGuard } from './guard/auth.guard';
import { CuidadosComponent } from './pages/cuidados/cuidados.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'meus-pets', component: MeusPetsComponent, canActivate: [AuthGuard] },
  { path: 'cuidados', component: CuidadosComponent, canActivate: [AuthGuard] },
  { path: 'veterinarios', component: HospitaisComponent },
  { path: 'petshops', component: PetShopsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
