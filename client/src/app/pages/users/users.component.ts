import { Component } from '@angular/core';
import { UsersTableComponent } from '../../components/users-table/users-table.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UsersTableComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent {}
