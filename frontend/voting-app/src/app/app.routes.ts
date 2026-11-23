import { Routes } from '@angular/router';
import { Polls } from './components/polls/polls';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'api/polls',
    pathMatch: 'full',
  },
  {
    path: 'api/polls',
    component: Polls,
  },
  {
    path: 'api/polls/vote',
    component: Polls,
  },
];
