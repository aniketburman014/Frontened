import { Injectable } from '@angular/core';
import { SalesOrder } from '../model/SalesOrder';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private apiUrl = 'https://localhost:7230/api/Sales'; // Update to match your backend endpoint
  private headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  });

  constructor(private http: HttpClient) {}

  // Get all sales orders
  getSalesOrders(): Observable<SalesOrder[]> {
    return this.http.get<SalesOrder[]>(`${this.apiUrl}`, {
      headers: this.headers,
    });
  }

  // Search sales orders
  searchSalesOrders(query: string): Observable<SalesOrder[]> {
    return this.http.get<SalesOrder[]>(`${this.apiUrl}/search?query=${encodeURIComponent(query)}`, {
      headers: this.headers,
    });
  }

  // Add a new sales order
  addSalesOrder(order: SalesOrder): Observable<SalesOrder> {
    return this.http.post<SalesOrder>(`${this.apiUrl}`, order, {
      headers: this.headers,
    });
  }

  // Update an existing sales order
  updateSalesOrder(id: number, order: SalesOrder): Observable<SalesOrder> {
    return this.http.put<SalesOrder>(`${this.apiUrl}/${id}`, order, {
      headers: this.headers,
    });
  }

  // Delete a sales order
  deleteSalesOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.headers,
    });
  }
}
