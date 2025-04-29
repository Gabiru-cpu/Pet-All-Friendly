import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PetDTO } from '../models/pet-dto-model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private baseUrl = 'http://localhost:8080/api/pets';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    let token: any;

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      token = localStorage.getItem('tokenPAF');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  
  

  getMyPets() {
    return this.http.get<PetDTO[]>(`${this.baseUrl}/me`, { headers: this.getAuthHeaders() });
  }

  createPet(pet: PetDTO) {
    return this.http.post(this.baseUrl, pet, { headers: this.getAuthHeaders() });
  }

  updatePet(id: number, pet: PetDTO) {
    return this.http.put(`${this.baseUrl}/${id}`, pet, { headers: this.getAuthHeaders() });
  }

  deletePet(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  getPetById(id: number) {
    return this.http.get<PetDTO>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
