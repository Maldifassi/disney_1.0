export interface DisneyCharacter {             // Interfaccia che descrive la struttura di un personaggio Disney
  _id: number;                                // Identificatore numerico del personaggio
  name: string;                               // Nome del personaggio
  imageUrl?: string;                          // URL dell'immagine (opzionale)
  films: string[];                            // Lista di film in cui appare (array di stringhe)
  shortFilms: string[];                       // Lista di cortometraggi
  tvShows: string[];                          // Lista di serie TV
  videoGames: string[];                       // Lista di videogiochi
  parkAttractions: string[];                  // Lista di attrazioni nei parchi
  allies: string[];                           // Lista di alleati
  enemies: string[];                          // Lista di nemici
  sourceUrl?: string;                         // Link esterno con maggiori informazioni (opzionale)
  url?: string;                               // URL dell'oggetto nell'API (opzionale)
}

export interface CharactersListResponse {      // Interfaccia per la risposta della lista di personaggi
  info: {                                     // Oggetto info con metadati sulla paginazione
    totalPages?: number;                      // Numero totale di pagine (può anche non esserci)
    count: number;                            // Numero di risultati nella pagina corrente
    previousPage?: string | null;             // URL della pagina precedente, se esiste
    nextPage?: string | null;                 // URL della pagina successiva, se esiste
  };
  data: DisneyCharacter[];                    // Array di personaggi Disney
}

export interface CharacterDetailResponse {     // Interfaccia per la risposta del dettaglio
  info: {                                     // Info aggiuntive (usate poco qui)
    count: number;                            // Numero di elementi (di solito 1)
  };
  data: DisneyCharacter;                      // Il personaggio richiesto
}