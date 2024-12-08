import { Injectable } from '@angular/core';
import { Inventory } from '../model/Inventory';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'https://localhost:7230/api/Inventory';
  private headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  });

  constructor(private http: HttpClient) {}

  // Get all inventory items
  getInventories(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.apiUrl}`, {
      headers: this.headers,
    });
  }

  // Search inventory items based on query
  searchInventories(query: string): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.apiUrl}/search/${query}`, {
      headers: this.headers,
    });
  }

  // Add a new inventory item
  addInventory(inventory: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(`${this.apiUrl}`, inventory, {
      headers: this.headers,
    });
  }

  // Update an existing inventory item
  updateInventory(id: number, inventory: Inventory): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.apiUrl}/${id}`, inventory, {
      headers: this.headers,
    });
  }

  // Delete an inventory item
  deleteInventory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.headers,
    });
  }
  
}
