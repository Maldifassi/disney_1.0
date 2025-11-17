export interface DisneyCharacter {
  _id: number;
  name: string;
  imageUrl?: string;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  parkAttractions: string[];
  allies: string[];
  enemies: string[];
  sourceUrl?: string;
  url?: string;
}

export interface CharactersListResponse {
  info: {
    totalPages?: number;
    count: number;
    previousPage?: string | null;
    nextPage?: string | null;
  };
  data: DisneyCharacter[];
}

export interface CharacterDetailResponse {
  info: {
    count: number;
  };
  data: DisneyCharacter;
}