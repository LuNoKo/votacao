import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { AllUsers, User, UserTypes } from '../../models/User';
import { UsersActionsButtonsComponent } from '../users-actions-buttons/users-actions-buttons.component';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule, UsersActionsButtonsComponent],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class UsersTableComponent {
  allUsers: AllUsers[] = [];
  userTypeDescriber: UserTypes[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getAllUsers().subscribe((response) => {
      this.allUsers = response;
    });

    this.userTypeDescriber = this.usersService.getUserTypes();
  }

  getUserTypeDescription(userType: string) {
    const userTypeEntry = this.userTypeDescriber?.find(
      (entry) => entry.userType === userType
    );

    if (userTypeEntry) {
      return userTypeEntry.describe;
    } else {
      return 'Tipo de usuário desconhecido';
    }
  }
}
