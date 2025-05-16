import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CuidadoDTO } from '../models/cuidados-dto-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuidadosService {
  private baseUrl = 'http://localhost:8080/api/cuidados';

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

  getAllCuidados(): Observable<CuidadoDTO[]> {
    return this.http.get<CuidadoDTO[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }
  




  private API_KEY = 'k1K8Z8ZKRfM39yFQVFuFYbdbYyBTmdAB0TidWCzajdjwPFn3oh9a5Kl8';
  private BASE_URL = 'https://api.pexels.com/v1/search';

  buscarImagem(animal: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.API_KEY
    });

    return this.http.get(`${this.BASE_URL}?query=${animal}&per_page=2&page=1`, { headers });
  }
}