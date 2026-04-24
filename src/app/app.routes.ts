import { Routes } from '@angular/router';
import { PlayersComponent } from './pages/players/players';
import { EnemiesComponent } from './pages/enemies/enemies';
import { TurnsComponent } from './pages/turns/turns';

export const routes: Routes = [
  { path: '', redirectTo: 'players', pathMatch: 'full' },
  { path: 'players', component: PlayersComponent },
  { path: 'enemies', component: EnemiesComponent },
  { path: 'turns', component: TurnsComponent }
];