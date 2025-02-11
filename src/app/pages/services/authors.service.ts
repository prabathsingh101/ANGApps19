import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Authors } from '../models/authors';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  constructor() {}

  private http = inject(HttpClient);

  private authorSignal = signal<Authors[]>([]);

  private baseUrl = 'https://localhost:7037/api/Author/';

  getAuthors() {
    return this.http
      .get<Authors[]>(`${this.baseUrl}AllAuthor`)
      .subscribe((authors) => this.authorSignal.set(authors));
  }

  get authors() {
    return this.authorSignal;
  }

  addAuthors(authors: Authors): any {
    return this.http
      .post(`${this.baseUrl}post`, authors)
      .subscribe(() => this.getAuthors());
  }

  deleteAuthors(AuthorId: number) {
    return this.http
      .delete(`${this.baseUrl}${AuthorId}`)
      .subscribe(() => this.getAuthors());
  }

  updateAuthors(autherId: number, authors: Authors) {
    return this.http
      .put(`${this.baseUrl}${autherId}`, authors)
      .subscribe(() => this.getAuthors());
  }

  getAuthorsById(autherId: number) {
    return this.http
      .get(`${this.baseUrl}${autherId}`)
      .subscribe(() => this.getAuthors());
  }

  getByIds(id: any) {
    return this.authorSignal().find((authors) => authors.AuthorId == id);
  }
}
