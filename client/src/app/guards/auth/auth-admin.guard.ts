import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      if (this.authService.isUserAuthenticated()) {
        this.router.navigate(['/']);
        return false;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }
}
