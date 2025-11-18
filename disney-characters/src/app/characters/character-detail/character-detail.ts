import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DisneyApiService } from '../../services/disney-api';
import { CharacterDetailResponse, DisneyCharacter } from '../../models/disney-character';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './character-detail.html',
  styleUrls: ['./character-detail.css']
})
export class CharacterDetailComponent implements OnInit {
  character?: DisneyCharacter;
  loading = false;
  errorMessage = '';
  showImage = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private disneyApi: DisneyApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'Personaggio non trovato.';
      return;
    }
    this.loadCharacter(id);
  }

  loadCharacter(id: string): void {
    this.loading = true;
    this.errorMessage = '';
    this.showImage = true;

    this.disneyApi.getCharacterById(id).subscribe({
      next: (response: CharacterDetailResponse) => {
        this.character = response.data;

        const url = this.character?.imageUrl ?? '';
        this.showImage = !!url && url.trim().length > 0;

        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Impossibile caricare il personaggio.';
        this.loading = false;
      }
    });
  }

  onImageError(): void {
    this.showImage = false;
  }

  goBack(): void {
    this.router.navigate(['/characters']);
  }

  hasItems(list?: string[]): boolean {
    return !!list && list.length > 0;
  }
}