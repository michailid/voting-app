import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Polls } from './components/polls/polls';

@Component({
  imports: [RouterOutlet, Polls],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('voting-app');
}
