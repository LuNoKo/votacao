import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private serverUrl = `${environment.serverUrlV1}`;

  private tokenSubject = new BehaviorSubject<string>('');
  private userSubject = new BehaviorSubject<any>(null);

  jwtTokenKey = 'voteAqui/token';
  userKey = 'voteAqui/user';

  constructor(
    private httpClient: HttpClient,
    private readonly toastService: ToastService,
  ) {
    this.initialize();
  }

  private initialize() {
    const token = localStorage.getItem(this.jwtTokenKey);
    const user = localStorage.getItem(this.userKey);

    if (token && user) {
      this.tokenSubject.next(token);
      this.userSubject.next(JSON.parse(user));
    }
  }

  getTokenValue(): string {
    return this.tokenSubject.value;
  }

  isUserAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }

  isAdmin(): boolean {
    return (
      this.userSubject.value?.userType === 'ADMIN' && this.isUserAuthenticated()
    );
  }

  getUserFirstName(): Observable<string> {
    return this.userSubject.value?.firstName;
  }

  login(cpf: string, password: string): Observable<any> {
    return this.httpClient
      .post(`${this.serverUrl}/auth`, { cpf, password })
      .pipe(
        map((response: any) => {
          this.setLocalStorage(response.accessToken, response.user);
          this.tokenSubject.next(response.accessToken);
          this.userSubject.next(response.user);

          this.toastService.show({
            message: 'Login realizado com sucesso!',
            type: 'success',
          });

          return response;
        }),
        catchError((error) => {
          this.toastService.show({
            message: error.error.message,
            type: 'error',
          });

          return throwError(error);
        }),
      );
  }

  revalidate(): Observable<any> {
    return this.httpClient.patch(`${this.serverUrl}/revalidate`, {}).pipe(
      map((response: any) => {
        this.tokenSubject.next(response.access_token);
        this.userSubject.next(response.user);
        this.setLocalStorage(response.access_token, response.user);

        return response;
      }),
      catchError((error) => {
        if (error.status === 401) {
          this.handleSessionExpiration();
        } else {
          this.toastService.show({
            message: 'Erro ao revalidar a sessão!',
            type: 'error',
          });

          this.removeLocalStorage();
        }
        return throwError(error);
      }),
    );
  }

  logout() {
    this.removeLocalStorage();
    this.tokenSubject.next('');
    this.userSubject.next(null);

    this.toastService.show({
      message: 'Logout realizado com sucesso!',
      type: 'success',
    });
  }

  private handleSessionExpiration() {
    this.removeLocalStorage();
    this.tokenSubject.next('');
    this.userSubject.next(null);

    this.toastService.show({
      message: 'Sessão expirada',
      type: 'error',
    });
  }

  setLocalStorage(tokenValue: string, user: any) {
    localStorage.setItem(this.jwtTokenKey, tokenValue);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  removeLocalStorage() {
    localStorage.removeItem(this.jwtTokenKey);
    localStorage.removeItem(this.userKey);
  }
}
