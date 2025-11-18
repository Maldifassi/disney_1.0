import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DisneyApiService } from '../../services/disney-api';
import { CharactersListResponse, DisneyCharacter } from '../../models/disney-character';
import { CharacterCardComponent } from '../character-card/character-card';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CharacterCardComponent],
  templateUrl: './characters-list.html',
  styleUrls: ['./characters-list.css']
})
export class CharactersListComponent implements OnInit {
  characters: DisneyCharacter[] = [];
  loading = false;
  errorMessage = '';

  currentPage = 1;
  totalPages = 1;
  readonly pageSize = 20;

  searchQuery = '';
  isSearching = false;

  constructor(private disneyApi: DisneyApiService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(page: number = 1): void {
    this.loading = true;
    this.errorMessage = '';
    this.isSearching = false;

    this.disneyApi.getCharacters(page, this.pageSize).subscribe({
      next: (response: CharactersListResponse) => {
        this.characters = response.data;
        this.currentPage = page;
        this.totalPages = response.info.totalPages ?? 1;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Impossibile caricare i personaggi. Riprova più tardi.';
        this.loading = false;
      }
    });
  }

  search(): void {
    const trimmed = this.searchQuery.trim();
    if (!trimmed) {
      this.loadCharacters(1);
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.isSearching = true;

    this.disneyApi.searchCharactersByName(trimmed, 1).subscribe({
      next: (response: CharactersListResponse) => {
        this.characters = response.data;
        this.currentPage = 1;
        this.totalPages = response.info.totalPages ?? 1;

        if (response.info.count === 0 || response.data.length === 0) {
          this.errorMessage = `Nessun personaggio trovato per "${trimmed}".`;
        }

        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Errore durante la ricerca. Riprova.';
        this.loading = false;
      }
    });
  }

  resetSearch(): void {
    this.searchQuery = '';
    this.loadCharacters(1);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      if (this.isSearching) {
        this.searchPage(this.currentPage - 1);
      } else {
        this.loadCharacters(this.currentPage - 1);
      }
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      if (this.isSearching) {
        this.searchPage(this.currentPage + 1);
      } else {
        this.loadCharacters(this.currentPage + 1);
      }
    }
  }

  private searchPage(page: number): void {
    const trimmed = this.searchQuery.trim();
    if (!trimmed) {
      this.loadCharacters(page);
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.disneyApi.searchCharactersByName(trimmed, page).subscribe({
      next: (response: CharactersListResponse) => {
        this.characters = response.data;
        this.currentPage = page;
        this.totalPages = response.info.totalPages ?? 1;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Errore durante la paginazione della ricerca.';
        this.loading = false;
      }
    });
  }
}