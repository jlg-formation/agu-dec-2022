import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { tooManyArticlesGuard } from '../guards/too-many-articles.guard';
import { AddComponent } from './add/add.component';
import { StockComponent } from './stock.component';

const routes: Routes = [
  {
    path: '',
    component: StockComponent,
    title: 'Gestion Stock - Liste des articles',
  },
  {
    path: 'add',
    component: AddComponent,
    canActivate: [],
    title: 'Gestion Stock - Ajouter un article',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule {}
