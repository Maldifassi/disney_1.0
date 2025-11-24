import { Component, OnInit } from '@angular/core';                   // Importa Component e OnInit
import { CommonModule } from '@angular/common';                      // Importa CommonModule
import { ActivatedRoute, Router, RouterLink } from '@angular/router';// Importa ActivatedRoute, Router e RouterLink per gestire le rotte
import { DisneyApiService } from '../../services/disney-api';        // Importa il servizio DisneyApiService
import { CharacterDetailResponse, DisneyCharacter } from '../../models/disney-character';
// Importa il tipo della risposta dettaglio e l'interfaccia del personaggio

@Component({
  selector: 'app-character-detail',                                  // Tag HTML del componente dettaglio
  standalone: true,                                                  // Componente standalone
  imports: [CommonModule, RouterLink],                               // Moduli usati nel template
  templateUrl: './character-detail.html',                            // Template HTML associato
  styleUrls: ['./character-detail.css']                              // Stili CSS associati
})
export class CharacterDetailComponent implements OnInit {            // Classe del componente che implementa OnInit
  character?: DisneyCharacter;                                       // Oggetto personaggio (può essere undefined finché non carica)
  loading = false;                                                   // Flag per lo stato di caricamento
  errorMessage = '';                                                 // Messaggio di errore per la UI
  showImage = true;                                                  // Flag che decide se mostrare l'immagine o il testo "Immagine non presente"

  constructor(
    private route: ActivatedRoute,                                   // Inietta l'oggetto ActivatedRoute per leggere i parametri dalla route
    private router: Router,                                          // Inietta il Router per navigare tra le pagine
    private disneyApi: DisneyApiService                              // Inietta il servizio per chiamare l'API
  ) {}

  ngOnInit(): void {                                                 // Metodo chiamato quando il componente viene inizializzato
    const id = this.route.snapshot.paramMap.get('id');               // Legge il parametro 'id' dalla URL
    if (!id) {                                                       // Se l'id non è presente
      this.errorMessage = 'Personaggio non trovato.';                // Imposta un messaggio di errore
      return;                                                        // Esce senza chiamare l'API
    }
    this.loadCharacter(id);                                          // Carica il personaggio corrispondente all'id
  }

  loadCharacter(id: string): void {                                  // Funzione che carica il personaggio dal service
    this.loading = true;                                             // Attiva lo stato di caricamento
    this.errorMessage = '';                                          // Svuota eventuali errori precedenti
    this.showImage = true;                                           // Di default prova a mostrare l'immagine

    this.disneyApi.getCharacterById(id).subscribe({                  // Chiama il service per ottenere il dettaglio
      next: (response: CharacterDetailResponse) => {                 // In caso di successo
        this.character = response.data;                              // Salva il personaggio ricevuto
        const url = this.character?.imageUrl ?? '';                  // Recupera l'URL dell'immagine (o stringa vuota)
        this.showImage = !!url && url.trim().length > 0;             // Se l'URL è vuoto, showImage diventa false
        this.loading = false;                                        // Fine caricamento
      },
      error: () => {                                                 // In caso di errore nella chiamata API
        this.errorMessage = 'Impossibile caricare il personaggio.';  // Messaggio di errore
        this.loading = false;                                        // Fine caricamento
      }
    });
  }

  onImageError(): void {                                             // Funzione chiamata quando l'immagine restituisce errore (onerror)
    this.showImage = false;                                          // Nasconde l'img e mostra il box "Immagine non presente"
  }

  goBack(): void {                                                   // Funzione per tornare alla lista
    this.router.navigate(['/characters']);                           // Naviga alla route '/characters'
  }

  hasItems(list?: string[]): boolean {                               // Funzione di utilità che verifica se una lista ha elementi
    return !!list && list.length > 0;                                // Ritorna true se la lista esiste e ha almeno un elemento
  }
}