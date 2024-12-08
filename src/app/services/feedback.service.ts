import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../model/Feedback';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = 'https://localhost:7230/api/Feedback';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}`);
  }

  search(query: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}/search?query=${query}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  addFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.baseUrl}`, feedback);
  }
}
