import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Subject, SubjectWithId } from '../../models/Subject';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Category } from '../../models/Category';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  private serverUrlForSubject = `${environment.serverUrl}/subject`;

  private allCategories = [
    { value: 'GAMES', description: 'Jogos' },
    { value: 'POLICY', description: 'Politica' },
    { value: 'TRAFFIC', description: 'Transito' },
    { value: 'FINANCE', description: 'Financas' },
    { value: 'EDUCATION', description: 'Educação' },
  ];

  constructor(
    private httpClient: HttpClient,
    private toastService: ToastService
  ) {}

  createSubject(subject: Subject) {
    return this.httpClient
      .post<Subject>(this.serverUrlForSubject, subject)
      .pipe(
        map((response) => {
          this.toastService.show({
            message: 'Pauta criada com sucesso!',
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
        })
      );
  }

  getAllSubject() {
    return this.httpClient.get<SubjectWithId[]>(`${this.serverUrlForSubject}`);
  }

  getOneSubjectById(id: string) {
    return this.httpClient.get<SubjectWithId>(
      `${this.serverUrlForSubject}/${id}`
    );
  }

  getAllCategories(): Observable<Category[]> {
    return of(this.allCategories);
  }
}
