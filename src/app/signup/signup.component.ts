import { Component } from '@angular/core';
import { UserSignup } from '../model/userSignup'; // UserSignup model
import { SignupService } from '../services/signup.service'; // SignupService
import { Router } from '@angular/router'; // For navigation
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'], // Fix typo: styleUrl -> styleUrls
})
export class SignupComponent {
  _user: UserSignup = {
    Username: '',
    Email: '',
    PasswordHash: '',
    Role: '',
  };

  constructor(private signupService: SignupService, private router: Router) {}

  onSubmit(): void {
    this.signupService.Authenticate(this._user).subscribe(
      (response) => {
        alert('Signup successful!');
        console.log('Response:', response);

        // Redirect to login page after successful signup
        this.router.navigate(['/home/users']);

        // Reset the form
        this._user = {
          Username: '',
          Email: '',
          PasswordHash: '',
          Role: '',
        };
      },
      (error) => {
        // Display error with a message from the server or fallback
        alert(error?.message || 'An unexpected error occurred. Please try again later.');
        console.error('Error:', error);
      }
    );
  }
}
