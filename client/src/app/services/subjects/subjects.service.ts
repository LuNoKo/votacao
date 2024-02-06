import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Subject, SubjectWithId } from '../../models/Subject';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Category } from '../../models/Category';

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

  constructor(private httpClient: HttpClient) {}

  createSubject(subject: Subject) {
    return this.httpClient
      .post<Subject>(this.serverUrlForSubject, subject)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
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

  getAllVotesBySubject(id: string) {
    return this.httpClient.get<Subject>(
      `${this.serverUrlForSubject}/allVotes/${id}`
    );
  }

  getAllCategories(): Observable<Category[]> {
    return of(this.allCategories);
  }
}
