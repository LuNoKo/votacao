import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { AllUsers, UserType } from '../../models/User';
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
  userTypeDescriber: UserType[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getAllUsers().subscribe((response) => {
      this.allUsers = response;
    });

    this.usersService.getUserTypes().subscribe((response) => {
      this.userTypeDescriber = response;
    });
  }

  getUserTypeDescription(userType: string) {
    const userTypeEntry = this.userTypeDescriber?.find(
      (entry) => entry.value === userType,
    );

    if (userTypeEntry) {
      return userTypeEntry.description;
    } else {
      return 'Tipo de usuário desconhecido';
    }
  }
}
