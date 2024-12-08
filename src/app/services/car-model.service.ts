import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { CarModel } from '../model/CarModel';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarModelService {
  private apiUrl = 'https://localhost:7230/api/Car'; // Base API URL
  private headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Attach Bearer token if required
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  
  getAllCarModels(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>(`${this.apiUrl}/AllCarModel`, {
      headers: this.headers,
    });
  }
  getCarModelById(id: string): Observable<CarModel> {
    return this.http.get<CarModel>(`${this.apiUrl}/GetCarModel/${id}`, {
      headers: this.headers,
    });
  }

  
  createCarModel(carModel: CarModel): Observable<CarModel> {
    return this.http.post<CarModel>(`${this.apiUrl}/AddCarModel`, carModel, {
      headers: this.headers,
    });
  }

  
  updateCarModel(id: number, carModel: CarModel): Observable<CarModel> {
    return this.http.put<CarModel>(`${this.apiUrl}/UpdateCarModel/${id}`, carModel, {
      headers: this.headers,
    });
  }

  
  deleteCarModel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, {
      headers: this.headers,
    });
  }
  
}
