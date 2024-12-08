import { Injectable } from '@angular/core';
import { UserSignup } from '../model/userSignup';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwt-decode

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private url = 'https://localhost:7230/api/User/signup';

  constructor(private _httpClient: HttpClient) {}

  Authenticate(user: UserSignup): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._httpClient.post<any>(this.url, user, { headers }).pipe(
      tap((response) => {
        if (response && response.token) {
          // Save token in localStorage
          localStorage.setItem('authToken', response.token);

          // Decode the token
          const decoded = this.decodeToken(response.token);

          // Save decoded details in localStorage
          if (decoded) {
            localStorage.setItem('username', decoded.sub);
            localStorage.setItem('email', decoded.email);
            localStorage.setItem('role', decoded.role);
          }
        }
      }),
      catchError((error) => {
        // Handle error (log it, return specific error message, etc.)
        return throwError(() => error.error || { message: 'An unknown error occurred.' });
      })
    );
  }

  // Function to decode the JWT token
  private decodeToken(token: string): any {
    try {
      const decoded: any = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }
}
