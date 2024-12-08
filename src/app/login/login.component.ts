import { Component } from '@angular/core';
import { LoginUser } from '../model/LoginUser'; // Your LoginUser model
import { LoginService } from '../services/login.service'; // Your LoginService
import { Router, RouterModule } from '@angular/router'; // For navigating after login
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  _user: LoginUser = {
    Email: '',
    Password: '',
  };

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(): void {
    this.loginService.Authenticate(this._user).subscribe(
      (response) => {
        // Check if token is returned and handle accordingly
        if (response && response.token) {
          // Save token to localStorage
          localStorage.setItem('authToken', response.token);

          // Redirect to HomeComponent on successful login
          this.router.navigate(['/home/users']);
        } else {
          alert(response.message || 'Login failed.');
        }
      },
      (error) => {
        // Display an error alert with a message from the backend
        alert('An error occurred during login.');
        console.error('Error:', error);
      }
    );
  }
 
}
