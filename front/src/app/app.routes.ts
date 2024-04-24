import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';

export const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
    title: 'Gestion Stock',
  },
  {
    loadComponent: () =>
      import('./routes/legal/legal.component').then((m) => m.LegalComponent),
    path: 'legal',
    title: 'Gestion Stock - Mentions Légales',
  },
  {
    path: 'stock',
    loadChildren: () =>
      import('./stock/stock.module').then((m) => m.StockModule),
  },
];
