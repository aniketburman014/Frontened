import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  name: string = localStorage.getItem('username') || ''; 
  role: string = localStorage.getItem('role') || ''; 

  constructor(private router: Router) {} 
  // Method to capitalize the first letter of the name and make the rest lowercase
  formatName(name: string): string {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  // Method to get the first letter as the user image (initial)
  getUserInitial(name: string): string {
    if (!name) return '';
    return name.charAt(0).toUpperCase();
  }
  getRole(){
    return this.formatName(this.role);
  }
  logout(): void {
    // Remove token and username from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('role');

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
