import { Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { StockComponent } from './stock.component';

export const routes: Routes = [
  { path: '', component: StockComponent },
  { path: 'add', component: AddComponent },
];
