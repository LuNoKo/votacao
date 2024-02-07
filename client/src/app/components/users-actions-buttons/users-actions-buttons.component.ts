import { Component, Input } from '@angular/core';
import { AllUsers } from '../../models/User';
import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-users-actions-buttons',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './users-actions-buttons.component.html',
  styleUrl: './users-actions-buttons.component.css',
})
export class UsersActionsButtonsComponent {
  @Input() user: AllUsers = {} as AllUsers;

  constructor(private usersService: UsersService) {}

  delete(userId: string) {
    this.usersService.deleteUser(userId).subscribe({
      next: (response) => {
        setTimeout(() => {
          location.reload();
        }, 500);
      },
    });
  }
}
