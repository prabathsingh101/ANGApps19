import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Authors } from '../models/authors';

@Injectable({
  providedIn: 'root',
})
export class AuthorsCrudService {
  constructor() {}

  private http = inject(HttpClient);

  private authorSignal = signal<Authors[]>([]);

  private baseUrl = 'https://localhost:7037/api/Author/';

  getAuthors() {
    return this.http.get<Authors[]>(`${this.baseUrl}AllAuthor`);
  }

  addAuthors(authors: Authors): any {
    return this.http.post(`${this.baseUrl}post`, authors);
  }

  deleteAuthors(AuthorId: number) {
    return this.http.delete(`${this.baseUrl}${AuthorId}`);
  }

  updateAuthors(autherId: number, authors: Authors) {
    return this.http.put(`${this.baseUrl}${autherId}`, authors);
  }

  getAuthorsById(autherId: number) {
    return this.http.get(`${this.baseUrl}${autherId}`);
  }
}
