import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { LegalComponent } from './routes/legal/legal.component';

export const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: LegalComponent,
    path: 'legal',
  },
  {
    path: 'stock',
    loadChildren: () =>
      import('./stock/stock.module').then((m) => m.StockModule),
  },
];
