import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Vote, VoteResult } from '../../models/Vote';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class VotesService {
  private serverUrl = `${environment.serverUrl}/votes`;

  constructor(
    private httpClient: HttpClient,
    private toastService: ToastService
  ) {}

  createVote(subjectId: string, answer: boolean): Observable<Vote> {
    return this.httpClient
      .post<Vote>(`${this.serverUrl}`, {
        subjectId,
        answer,
      })
      .pipe(
        map((response) => {
          this.toastService.show({
            message: 'Voto realizado com sucesso!',
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

  HasUserVotedBySubject(subjectId: string): Observable<boolean> {
    return this.httpClient.get<boolean>(
      `${this.serverUrl}/hasUserVotedBySubject/${subjectId}`
    );
  }

  getResult(subjectId: string): Observable<VoteResult> {
    return this.httpClient.get<VoteResult>(
      `${this.serverUrl}/result/${subjectId}`
    );
  }
}
