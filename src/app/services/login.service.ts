import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginUser } from '../model/LoginUser';
import {jwtDecode} from 'jwt-decode'; // Import the jwt-decode library

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'https://localhost:7230/api/User/login'; // Replace with your API endpoint

  constructor(private httpClient: HttpClient) {}

  Authenticate(_user: LoginUser): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<any>(this.url, _user, { headers }).pipe(
      tap((response) => {
        if (response && response.token) {
          // Save the token to localStorage
          localStorage.setItem('authToken', response.token);

          // Decode the token
          const decoded = this.decodeToken(response.token);

          // Log username (or any other decoded information)
          localStorage.setItem('username', decoded.sub);
          localStorage.setItem('email', decoded.email);
          localStorage.setItem('role', decoded.role);
          localStorage.setItem('exp', decoded.exp);
          
        }
      })
    );
  }

  // Function to decode the token
  decodeToken(token: string): any {
    try {
      // Decode the token using jwt-decode
      const decoded: any = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }
  
}
