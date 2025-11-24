import { Component, OnInit } from '@angular/core';                    // Importa Component e OnInit (lifecycle hook)
import { CommonModule } from '@angular/common';                       // Importa CommonModule (ngIf, ngFor, ecc.)
import { FormsModule } from '@angular/forms';                         // Importa FormsModule per usare ngModel
import { RouterLink } from '@angular/router';                         // Importa RouterLink per i link di navigazione
import { DisneyApiService } from '../../services/disney-api';         // Importa il servizio che chiama l'API Disney
import { CharactersListResponse, DisneyCharacter } from '../../models/disney-character'; 
// Importa i tipi delle risposte e dei personaggi
import { CharacterCardComponent } from '../character-card/character-card'; 
// Importa il componente card usato per ogni personaggio

@Component({
  selector: 'app-characters-list',                                    // Nome del tag del componente lista
  standalone: true,                                                   // Componente standalone
  imports: [CommonModule, FormsModule, CharacterCardComponent],       // Moduli e componenti usati nel template
  templateUrl: './characters-list.html',                              // File HTML del template
  styleUrls: ['./characters-list.css']                                // File CSS degli stili
})
export class CharactersListComponent implements OnInit {              // Classe del componente che implementa OnInit
  characters: DisneyCharacter[] = [];                                // Array di personaggi da mostrare nella griglia
  loading = false;                                                   // Flag per mostrare lo stato di caricamento
  errorMessage = '';                                                 // Messaggio di errore da mostrare all’utente

  currentPage = 1;                                                   // Numero di pagina attuale (per la paginazione)
  totalPages = 1;                                                    // Numero totale di pagine
  readonly pageSize = 20;                                            // Numero di elementi per pagina (costante)

  searchQuery = '';                                                  // Testo della barra di ricerca
  isSearching = false;                                               // Flag che indica se siamo in modalità ricerca o lista completa

  constructor(private disneyApi: DisneyApiService) {}                // Costruttore con injection del service DisneyApiService

  ngOnInit(): void {                                                 // Metodo lifecycle chiamato quando il componente viene inizializzato
    this.loadCharacters();                                           // Carica la prima pagina di personaggi appena la pagina si apre
  }

  loadCharacters(page: number = 1): void {                           // Funzione per caricare i personaggi di una data pagina
    this.loading = true;                                             // Imposta lo stato di caricamento attivo
    this.errorMessage = '';                                          // Svuota eventuali messaggi di errore
    this.isSearching = false;                                        // Segna che non siamo in modalità ricerca

    this.disneyApi.getCharacters(page, this.pageSize).subscribe({    // Chiama il service per recuperare i personaggi
      next: (response: CharactersListResponse) => {                  // Callback in caso di successo
        this.characters = response.data;                             // Salva nell'array i personaggi ricevuti
        this.currentPage = page;                                     // Aggiorna la pagina attuale
        this.totalPages = response.info.totalPages ?? 1;             // Imposta il numero totale di pagine o 1 se non definito
        this.loading = false;                                        // Fine stato caricamento
      },
      error: () => {                                                 // Callback in caso di errore
        this.errorMessage = 'Impossibile caricare i personaggi. Riprova più tardi.'; 
        // Messaggio di errore da mostrare nella UI
        this.loading = false;                                        // Fine stato caricamento anche in errore
      }
    });
  }

  search(): void {                                                   // Funzione che parte quando si preme "Cerca"
    const trimmed = this.searchQuery.trim();                         // Elimina spazi all'inizio/fine del testo di ricerca
    if (!trimmed) {                                                  // Se la stringa è vuota...
      this.loadCharacters(1);                                        // ...ricarica la lista completa alla pagina 1
      return;                                                        // Esce dalla funzione
    }

    this.loading = true;                                             // Attiva lo stato di caricamento
    this.errorMessage = '';                                          // Svuota messaggi di errore
    this.isSearching = true;                                         // Segna che siamo in modalità ricerca

    this.disneyApi.searchCharactersByName(trimmed, 1).subscribe({    // Chiama il service per cercare per nome (prima pagina)
      next: (response: CharactersListResponse) => {                  // In caso di successo
        this.characters = response.data;                             // Aggiorna la lista di personaggi
        this.currentPage = 1;                                        // Imposta pagina corrente a 1
        this.totalPages = response.info.totalPages ?? 1;             // Aggiorna numero totale di pagine (se presente)

        if (response.info.count === 0 || response.data.length === 0) {
          // Se il risultato è vuoto (nessun personaggio trovato)
          this.errorMessage = `Nessun personaggio trovato per "${trimmed}".`; 
          // Mostra un messaggio all'utente
        }

        this.loading = false;                                        // Fine caricamento
      },
      error: () => {                                                 // In caso di errore nella ricerca
        this.errorMessage = 'Errore durante la ricerca. Riprova.';   // Messaggio di errore
        this.loading = false;                                        // Fine caricamento
      }
    });
  }

  resetSearch(): void {                                              // Funzione chiamata quando si preme "Reset"
    this.searchQuery = '';                                          // Svuota il campo di ricerca
    this.loadCharacters(1);                                         // Ricarica la pagina 1 con la lista completa
  }

  goToPreviousPage(): void {                                         // Gestisce il click sul pulsante "Precedente"
    if (this.currentPage > 1) {                                     // Solo se non siamo già alla pagina 1
      if (this.isSearching) {                                       // Se siamo in modalità ricerca
        this.searchPage(this.currentPage - 1);                       // Carica la pagina precedente dei risultati di ricerca
      } else {                                                      // Altrimenti (lista normale)
        this.loadCharacters(this.currentPage - 1);                   // Carica la pagina precedente della lista completa
      }
    }
  }

  goToNextPage(): void {                                             // Gestisce il click sul pulsante "Successiva"
    if (this.currentPage < this.totalPages) {                        // Solo se non siamo oltre l'ultima pagina
      if (this.isSearching) {                                       // Se siamo in modalità ricerca
        this.searchPage(this.currentPage + 1);                       // Carica la pagina successiva nei risultati di ricerca
      } else {
        this.loadCharacters(this.currentPage + 1);                   // Carica la pagina successiva nella lista completa
      }
    }
  }

  private searchPage(page: number): void {                           // Funzione privata per cambiare pagina in modalità ricerca
    const trimmed = this.searchQuery.trim();                         // Pulisce il testo di ricerca
    if (!trimmed) {                                                  // Se è vuoto...
      this.loadCharacters(page);                                     // ...torna alla lista normale
      return;                                                        // Esce dalla funzione
    }

    this.loading = true;                                             // Attiva lo stato di caricamento
    this.errorMessage = '';                                          // Svuota eventuali errori

    this.disneyApi.searchCharactersByName(trimmed, page).subscribe({// Chiama l'API con nome e pagina
      next: (response: CharactersListResponse) => {                  // In caso di successo
        this.characters = response.data;                             // Aggiorna la lista di personaggi
        this.currentPage = page;                                     // Aggiorna la pagina corrente
        this.totalPages = response.info.totalPages ?? 1;             // Aggiorna totale pagine
        this.loading = false;                                        // Fine caricamento
      },
      error: () => {                                                 // In caso di errore
        this.errorMessage = 'Errore durante la paginazione della ricerca.'; 
        // Messaggio di errore specifico per la paginazione in ricerca
        this.loading = false;                                        // Fine caricamento
      }
    });
  }
}