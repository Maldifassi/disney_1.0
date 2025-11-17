import { Routes } from '@angular/router';
import { CharactersListComponent } from './characters/characters-list/characters-list';
import { CharacterDetailComponent } from './characters/character-detail/character-detail';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'characters' },
  { path: 'characters', component: CharactersListComponent },
  { path: 'characters/:id', component: CharacterDetailComponent },
  { path: '**', redirectTo: 'characters' }
];