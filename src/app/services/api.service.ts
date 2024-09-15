import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:7121/ApiTest';  // URL base de la API


  // Método GET
  GetCustomersPredicatedDate(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetCustomersPredicatedDate`);
  }

  GetClientOrders(idCustomer:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetClientOrders/${idCustomer}`);
  }

  GetEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetEmployees`);
  }

  GetShippers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetShippers`);
  }
  
  GetProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetProducts`);
  }

 
  CreateOrder(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/CreateOrder`, data);
  }
}
