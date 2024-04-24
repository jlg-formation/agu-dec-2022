import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';

export const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    loadComponent: () =>
      import('./routes/legal/legal.component').then((m) => m.LegalComponent),
    path: 'legal',
  },
  {
    path: 'stock',
    loadChildren: () =>
      import('./stock/stock.module').then((m) => m.StockModule),
  },
];
