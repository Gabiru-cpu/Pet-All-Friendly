import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule, FormsModule, MatIcon, MatButton, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isRegistering = false;

  loginData = {
    email: '',
    senha: ''
  };

  registerData = {
    nome: '',
    telefone: '',
    email: '',
    senha: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  showRegister(event: Event): void {
    event.preventDefault();
    this.isRegistering = true;
  }

  showLogin(event: Event): void {
    event.preventDefault();
    this.isRegistering = false;
  }

  onLogin(): void {
    const loginPayload = {
      email: this.loginData.email,
      senha: this.loginData.senha
    };
  
    this.userService.login(loginPayload).subscribe({
      next: (response) => {

        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
          localStorage.setItem('tokenPAF', response.token);
          localStorage.setItem('nomeContaPAF', response.nome);
          localStorage.setItem('emailContaPAF', response.email);
          this.router.navigate(['/']);
        }
        
        
      },
      error: (err) => {
        console.error('Erro no login', err);
        alert('Falha no login. Verifique suas credenciais.');
      }
    });
  }
  

  onRegister(): void {
    const registerPayload = {
      nome: this.registerData.nome,
      telefone: this.registerData.telefone,
      email: this.registerData.email,
      senha: this.registerData.senha
    };
  
    this.userService.register(registerPayload).subscribe({
      next: (res) => {
        alert(res);
        this.isRegistering = false;
  
        this.registerData = {
          nome: '',
          telefone: '',
          email: '',
          senha: ''
        };
      },
      error: (err) => {
        alert(err.error || err.message || 'Erro desconhecido.');
      }
    });
  }
  
}
