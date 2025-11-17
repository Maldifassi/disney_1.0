import { Component, Input } from '@angular/core';
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
export class CharacterCardComponent {
  @Input({ required: true }) character!: DisneyCharacter;

  get fallbackImage(): string {
    return 'https://via.placeholder.com/300x300?text=Disney+Character';
  }
}