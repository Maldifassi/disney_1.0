import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CharactersListResponse, CharacterDetailResponse} from '../models/disney-character';

@Injectable({
  providedIn: 'root'
})
export class DisneyApiService {
  private readonly baseUrl = 'https://api.disneyapi.dev';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1, pageSize: number = 20): Observable<CharactersListResponse> {
    const url = `${this.baseUrl}/character?page=${page}&pageSize=${pageSize}`;
    return this.http.get<CharactersListResponse>(url);
  }

  searchCharactersByName(name: string, page: number = 1): Observable<CharactersListResponse> {
    const params = new URLSearchParams({
      name,
      page: String(page)
    });
    const url = `${this.baseUrl}/character?${params.toString()}`;
    return this.http.get<CharactersListResponse>(url);
  }

  getCharacterById(id: number | string): Observable<CharacterDetailResponse> {
    const url = `${this.baseUrl}/character/${id}`;
    return this.http.get<CharacterDetailResponse>(url);
  }
}
