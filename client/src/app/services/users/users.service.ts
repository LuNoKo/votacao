import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import {
  AllUsers,
  CreateUser,
  RegisterUser,
  UpdatePasswordUser,
  User,
  UserTypes,
} from '../../models/User';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private serverUrlForUser = `${environment.serverUrl}/user`;

  userTypeDescriber = [
    { userType: 'ADMIN', describe: 'Administrador' },
    { userType: 'USER', describe: 'Usuário' },
  ];

  constructor(private httpClient: HttpClient) {}

  createUser(user: CreateUser) {
    return this.httpClient.post<User>(`${this.serverUrlForUser}`, user).pipe(
      map((response: User) => {
        return response;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  registerUser(user: RegisterUser) {
    return this.httpClient
      .post<User>(`${this.serverUrlForUser}/register`, user)
      .pipe(
        map((response: User) => {
          return response;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  getAllUsers() {
    return this.httpClient.get<AllUsers[]>(this.serverUrlForUser);
  }

  getOneUserById(id: string) {
    return this.httpClient.get<User>(`${this.serverUrlForUser}/${id}`);
  }

  updateUser(id: string, user: User) {
    return this.httpClient.put<User>(`${this.serverUrlForUser}/${id}`, user);
  }

  updatePasswordUser(updatePasswordUser: UpdatePasswordUser) {
    return this.httpClient.patch<UpdatePasswordUser>(
      `${this.serverUrlForUser}`,
      updatePasswordUser
    );
  }

  getUserTypes(): UserTypes[] {
    return this.userTypeDescriber;
  }
}
