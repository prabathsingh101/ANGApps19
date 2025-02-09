import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pages/dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (d) => d.DashboardComponent
      ),
  },
  {
    path: 'pages/authors',
    loadComponent: () =>
      import('./pages/authors/authors.component').then(
        (a) => a.AuthorsComponent
      ),
  },
  {
    path: 'pages/publishers',
    loadComponent: () =>
      import('./pages/publishers/publishers.component').then(
        (p) => p.PublishersComponent
      ),
  },
  {
    path: 'pages/books',
    loadComponent: () =>
      import('./pages/books/books.component').then((b) => b.BooksComponent),
  },
  {
    path: 'pages/members',
    loadComponent: () =>
      import('./pages/members/members.component').then(
        (m) => m.MembersComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (n) => n.NotFoundComponent
      ),
  },
];
