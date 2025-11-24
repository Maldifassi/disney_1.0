import { Injectable } from '@angular/core';                       // Importa il decoratore Injectable per dichiarare un service in Angular
import { HttpClient } from '@angular/common/http';                // Importa HttpClient per fare richieste HTTP
import { Observable } from 'rxjs';                                // Importa il tipo Observable, usato per le risposte asincrone
import {CharactersListResponse, CharacterDetailResponse} from '../models/disney-character'; 
// Importa le interfacce che descrivono la struttura dei dati ritornati dall'API

@Injectable({                                                       // Decoratore che indica che questa classe è un servizio iniettabile
  providedIn: 'root'                                               // Rende il service disponibile in tutta l'app (singleton globale)
})
export class DisneyApiService {                                    // Definizione della classe del servizio
  private readonly baseUrl = 'https://api.disneyapi.dev';          // URL base dell'API Disney, costante privata

  constructor(private http: HttpClient) {}                         // Costruttore che inietta HttpClient come dipendenza

  getCharacters(page: number = 1, pageSize: number = 20): Observable<CharactersListResponse> {
    // Metodo che recupera la lista di personaggi, con paginazione
    const url = `${this.baseUrl}/character?page=${page}&pageSize=${pageSize}`; 
    // Costruisce l'URL aggiungendo parametri page e pageSize
    return this.http.get<CharactersListResponse>(url);             // Esegue una GET e ritorna un Observable tipizzato con CharactersListResponse
  }

  searchCharactersByName(name: string, page: number = 1): Observable<CharactersListResponse> {
    // Metodo che cerca i personaggi in base al nome
    const params = new URLSearchParams({                           // Crea un oggetto URLSearchParams per costruire la query string
      name,                                                        // Parametro 'name' con il valore passato
      page: String(page)                                           // Parametro 'page', convertito in stringa
    });
    const url = `${this.baseUrl}/character?${params.toString()}`;  // Costruisce l'URL con i parametri di ricerca
    return this.http.get<CharactersListResponse>(url);             // Esegue la GET e ritorna un Observable con la lista filtrata
  }

  getCharacterById(id: number | string): Observable<CharacterDetailResponse> {
    // Metodo che recupera il dettaglio di un singolo personaggio usando il suo id
    const url = `${this.baseUrl}/character/${id}`;                 // Costruisce l'URL specificando l'id nella path
    return this.http.get<CharacterDetailResponse>(url);            // Esegue una GET e ritorna un Observable col dettaglio
  }
}