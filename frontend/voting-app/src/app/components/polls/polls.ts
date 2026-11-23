import { Component, inject, OnInit, signal } from '@angular/core';
import { Poll } from '../../model/poll.models';
import { PollService } from '../../services/poll-service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Vote } from '../../model/vote.models';

@Component({
  imports: [FormsModule],
  selector: 'app-polls',
  styleUrl: './polls.css',
  templateUrl: './polls.html',
})
export class Polls implements OnInit {
  polls = signal<Poll[]>([]);
  pollService = inject(PollService);
  router = inject(Router);
  newPoll: Poll = {
    id: 0,
    question: '',
    options: [
      { voteOption: '', voteCount: 0 },
      { voteOption: '', voteCount: 0 },
    ],
  };

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls() {
    this.pollService.getPolls().subscribe({
      next: (res: Poll[]) => {
        this.polls.set(res);
      },
      error: (error: Error) => {
        console.log('Error: ' + error.message);
      },
    });
  }

  addOption() {
    this.newPoll.options.push({ voteOption: '', voteCount: 0 });
  }

  removeOption(index: number) {
    this.newPoll.options.splice(index, 1);
  }

  createPoll() {
    this.pollService.createPoll(this.newPoll).subscribe({
      next: (createdPoll: Poll) => {
        this.polls.update((pollsArr) => [...pollsArr, createdPoll]);

        // erase the form fields
        this.newPoll = {
          id: 0,
          question: '',
          options: [
            { voteOption: '', voteCount: 0 },
            { voteOption: '', voteCount: 0 },
          ],
        };
      },
      error: (error: Error) => {
        alert('Error: ' + error.message);
      },
    });
  }

  vote(pollId: number, optionIndex: number) {
    this.router.navigateByUrl('/api/polls/vote');
    const vote: Vote = {
      pollId: pollId,
      optionIndex: optionIndex,
    };
    this.pollService.vote(vote).subscribe({
      next: () => {
        this.loadPolls();
      },
      error: (error: Error) => {
        alert('Error: ' + error.message);
      },
    });
  }
}
