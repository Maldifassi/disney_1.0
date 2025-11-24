import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
// Importa Component, Input (per ricevere dati dal padre), OnChanges (hook) e SimpleChanges (tipo per i cambiamenti)
import { CommonModule } from '@angular/common';        // CommonModule per ngIf, ecc.
import { RouterLink } from '@angular/router';         // RouterLink per rendere la card cliccabile e navigare
import { DisneyCharacter } from '../../models/disney-character'; 
// Importa l'interfaccia del personaggio

@Component({
  selector: 'app-character-card',                     // Tag HTML della card
  standalone: true,                                   // Componente standalone
  imports: [CommonModule, RouterLink],                // Moduli che la card può usare nel template
  templateUrl: './character-card.html',               // Template HTML associato
  styleUrls: ['./character-card.css']                 // Stili CSS associati
})
export class CharacterCardComponent implements OnChanges { // Classe del componente che implementa OnChanges
  @Input({ required: true }) character!: DisneyCharacter;  // Input obbligatorio: il personaggio da visualizzare

  showImage = true;                                     // Flag che indica se mostrare l'immagine oppure il testo "Immagine non presente"

  ngOnChanges(changes: SimpleChanges): void {           // Metodo chiamato quando l'input 'character' cambia
    if (changes['character']) {                         // Controlla se il cambiamento riguarda proprio 'character'
      const url = this.character?.imageUrl ?? '';       // Recupera l'URL dell'immagine (oppure stringa vuota)
      this.showImage = !!url && url.trim().length > 0;  // Se l'URL è non vuoto, showImage = true, altrimenti false
    }
  }

  onImageError(): void {                                // Metodo chiamato se il tag <img> emette l'evento error
    // se l'immagine va in errore (404, ecc) mostriamo il testo
    this.showImage = false;                             // Disattiva l'immagine e attiva il fallback "Immagine non presente"
  }
}