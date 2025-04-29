import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LembreteDTO } from '../models/Lembrete-dto-model';

@Injectable({
  providedIn: 'root'
})
export class LembreteService {
  private baseUrl = 'http://localhost:8080/api/lembretes';

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

  getAllMyPetsLembretes() {
    return this.http.get<LembreteDTO[]>(`${this.baseUrl}/meus`, { headers: this.getAuthHeaders() });
  }

  getLembretesByPetId(petId: number) {
    return this.http.get<LembreteDTO[]>(`${this.baseUrl}/pet/${petId}`, { headers: this.getAuthHeaders() });
  }

  createLembrete(lembrete: LembreteDTO) {
    return this.http.post(this.baseUrl, lembrete, { headers: this.getAuthHeaders() });
  }

  updateLembrete(id: number, lembrete: LembreteDTO) {
    return this.http.put(`${this.baseUrl}/${id}`, lembrete, { headers: this.getAuthHeaders() });
  }

  deleteLembrete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
