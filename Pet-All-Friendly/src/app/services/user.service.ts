import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../models/user-dto-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  login(data: { email: string; senha: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/login`, data);
  }  

  register(user: UserDTO) {
    return this.http.post(`${this.baseUrl}user/register`, user, { responseType: 'text' });
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.baseUrl}user/forgot-password?email=${email}`, {});
  }

  updateUser(id: number, user: UserDTO) {
    return this.http.put(`${this.baseUrl}user/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}user/${id}`);
  }
}
