import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/User';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'], // Correct the property name to "styleUrls"
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  searchQuery: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers(); // Ensure this method is called on initialization
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
      console.log(data);
      console.log(this.users);
    });
  }

  searchUsers(): void {
    if(this.searchQuery==''){
      this.loadUsers();
    }
    this.userService.getUsers(this.searchQuery).subscribe((data) => {
      this.users = data;
    });
  }

  editUser(user: User): void {
    const newName = prompt('Enter the new Role for User:', user.role);
    if (!newName) return;

    const updatedUser: User = { ...user, role: newName };
    this.userService.updateUser(user.userId, updatedUser).subscribe(() => {
      this.loadUsers();
    });
  }

  deleteUser(id: number): void {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }
}
