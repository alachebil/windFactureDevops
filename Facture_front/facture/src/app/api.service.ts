import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrls = (window as any)['env']['apiUrls'] || {
    authService: 'http://auth-service:8090/api',
    factureService: 'http://facture:8094/api',
    clientService: 'http://client-service:8092/api',
    servicesSer: 'http://services-ser:8093/api'
  };

  constructor(private http: HttpClient) {}

  login(credentials: any) {
    return this.http.post(`${this.apiUrls.authService}/login`, credentials);
  }

  getFactureData() {
    return this.http.get(`${this.apiUrls.factureService}/data`);
  }

  getClientData() {
    return this.http.get(`${this.apiUrls.clientService}/clients`);
  }

  getServices() {
    return this.http.get(`${this.apiUrls.servicesSer}/services`);
  }
}