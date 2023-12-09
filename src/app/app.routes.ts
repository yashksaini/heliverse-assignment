import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { TeamsComponent } from './teams/teams.component';

export const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'team',
    component: TeamsComponent,
  },
  {
    path: '**',
    component: UsersComponent,
    redirectTo: '',
  },
];
