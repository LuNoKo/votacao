import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
// import { ToastService } from '../../components/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router // private toastService: ToastService
  ) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      if (this.authService.isUserAuthenticated()) {
        this.router.navigate(['/']);

        console.log('Você não possui acesso a este módulo');
        // this.toastService.show({
        //   message: 'Você não tem permissão para acessar essa página',
        //   type: 'error',
        // });
        return false;
      } else {
        this.router.navigate(['/login']);
        console.log('Você não está logado');
        // this.toastService.show({
        //   message: 'Você não tem permissão para acessar essa página',
        //   type: 'error',
        // });
        return false;
      }
    }
  }
}
