import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  public navbarCollapsed = false;

  constructor(private authService: AuthService, private router: Router) {}

  get showAdminComponents() {
    return this.authService.isAdmin();
  }

  get isUserAuthenticated() {
    return this.authService.isUserAuthenticated();
  }

  get firtNameOfUserAuthenticated() {
    return this.authService.getUserFirstName();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
