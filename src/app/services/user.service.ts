import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../model/User';

// Define the UpUser interface
interface UpUser {
  UserId: number;
  Username: string;
  Email: string;
  Role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7230/api/Auth';
  private headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  });

  constructor(private http: HttpClient) {}

  // Fetch all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all-users`, {
      headers: this.headers,
    });
  }

  // Search users by name
  getUsers(name: string = ''): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/search-user?query=${name}`, {
      headers: this.headers,
    });
  }

  // Update a user
  updateUser(id: number, user: User): Observable<User> {
    // You can assign values of 'user' to 'UpUser' here if necessary
    const updatedUser: UpUser = {
      UserId: id,
      Username: user.username,
      Email: user.email,
      Role: user.role,
    };
    console.log(updatedUser);

    return this.http.put<User>(`${this.apiUrl}/update-user/${id}`, updatedUser, {
      headers: this.headers,
    });
  }

  // Delete a user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-user/${id}`, {
      headers: this.headers,
    });
  }
}
