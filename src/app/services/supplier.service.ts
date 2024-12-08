import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders , HttpParams} from '@angular/common/http';
import { Supplier } from '../model/Supplier';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = 'https://localhost:7230/api/Supplier';
  private headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  });

  constructor(private http: HttpClient) {}
  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.apiUrl}`, {
      headers: this.headers,
    });
  }

  
  searchSuppliers(query: string): Observable<Supplier[]> {
    
    return this.http.get<Supplier[]>(`${this.apiUrl}/search/${query}`, {headers: this.headers });
  }

 
  addSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.apiUrl}`, supplier, {
      headers: this.headers,
    });
  }

  
  updateSupplier(id: number, supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.apiUrl}/${id}`, supplier, {
      headers: this.headers,
    });
  }

  
  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.headers,
    });
  }
}
