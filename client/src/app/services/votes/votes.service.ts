import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { Vote, VoteResult } from '../../models/Vote';

@Injectable({
  providedIn: 'root',
})
export class VotesService {
  private serverUrl = `${environment.serverUrl}/votes`;

  constructor(private httpClient: HttpClient) {}

  createVote(subjectId: string, answer: boolean): Observable<Vote> {
    return this.httpClient.post<Vote>(`${this.serverUrl}`, {
      subjectId,
      answer,
    });
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
