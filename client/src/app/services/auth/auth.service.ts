import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private serverUrl = `${environment.serverUrl}`;

  private tokenSubject = new BehaviorSubject<string>('');
  private userSubject = new BehaviorSubject<any>(null);

  jwtTokenKey = 'voteAqui/token';
  userKey = 'voteAqui/user';

  constructor(private httpClient: HttpClient) {
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

          console.log('Login realizado com sucesso!');

          return response;
        }),
        catchError((error) => {
          return throwError(error);
        })
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
          console.log('Erro ao revalidar a sessão');

          this.removeLocalStorage();
        }
        return throwError(error);
      })
    );
  }

  logout() {
    this.removeLocalStorage();
    this.tokenSubject.next('');
    this.userSubject.next(null);

    console.log('Logout realizado com sucesso!');
  }

  private handleSessionExpiration() {
    this.removeLocalStorage();
    this.tokenSubject.next('');
    this.userSubject.next(null);
    console.log('Sessão expirada');
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
