import { Component, Input } from '@angular/core';
import { AllUsers, UserTypes } from '../../models/User';
import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-users-actions-buttons',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './users-actions-buttons.component.html',
  styleUrl: './users-actions-buttons.component.css',
})
export class UsersActionsButtonsComponent {
  @Input() user: AllUsers = {} as AllUsers;
  userTypeDescriber: UserTypes[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.userTypeDescriber = this.usersService.getUserTypes();
  }
}
