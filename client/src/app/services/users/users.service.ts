import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import {
  AllUsers,
  CreateUser,
  RegisterUser,
  UpdatePasswordUser,
  User,
  UserEdited,
  UserType,
} from '../../models/User';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private serverUrlForUser = `${environment.serverUrlV1}/user`;

  userTypeDescriber = [
    { value: 'ADMIN', description: 'Administrador' },
    { value: 'USER', description: 'Usuário' },
  ];

  constructor(
    private httpClient: HttpClient,
    private toastService: ToastService,
  ) {}

  createUser(user: CreateUser) {
    return this.httpClient.post<User>(`${this.serverUrlForUser}`, user).pipe(
      map((response: User) => {
        this.toastService.show({
          message: 'Usuário criado com sucesso!',
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

  registerUser(user: RegisterUser) {
    return this.httpClient
      .post<User>(`${this.serverUrlForUser}/register`, user)
      .pipe(
        map((response: User) => {
          this.toastService.show({
            message: 'Usuário registrado com sucesso!',
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

  getAllUsers() {
    return this.httpClient.get<AllUsers[]>(this.serverUrlForUser);
  }

  getOneUserById(id: string) {
    return this.httpClient.get<AllUsers>(`${this.serverUrlForUser}/${id}`);
  }

  updateUser(id: string, user: UserEdited) {
    return this.httpClient
      .put<User>(`${this.serverUrlForUser}/${id}`, user)
      .pipe(
        map((response: User) => {
          this.toastService.show({
            message: 'Usuário editado com sucesso!',
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

  updatePasswordUser(updatePasswordUser: UpdatePasswordUser) {
    return this.httpClient
      .patch<UpdatePasswordUser>(`${this.serverUrlForUser}`, updatePasswordUser)
      .pipe(
        map((response) => {
          this.toastService.show({
            message: 'Senha atualizada com sucesso!',
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

  getUserTypes(): Observable<UserType[]> {
    return of(this.userTypeDescriber);
  }
}
