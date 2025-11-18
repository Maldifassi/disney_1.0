import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DisneyCharacter } from '../../models/disney-character';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './character-card.html',
  styleUrls: ['./character-card.css']
})
export class CharacterCardComponent implements OnChanges {
  @Input({ required: true }) character!: DisneyCharacter;

  showImage = true; // controlla se mostrare l'img o il testo

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['character']) {
      const url = this.character?.imageUrl ?? '';
      this.showImage = !!url && url.trim().length > 0;
    }
  }

  onImageError(): void {
    // se l'immagine va in errore (404, ecc) mostriamo il testo
    this.showImage = false;
  }
}