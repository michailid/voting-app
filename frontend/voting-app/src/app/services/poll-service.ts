import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Poll } from '../model/poll.models';

@Service()
export class PollService {
  http = inject(HttpClient);

  getPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>('http://localhost:8080/api/polls');
  }

  createPoll(poll: Poll): Observable<Poll> {
    return this.http.post<Poll>('http://localhost:8080/api/polls', poll);
  }
}
