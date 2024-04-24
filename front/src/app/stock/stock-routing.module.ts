import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { tooManyArticlesGuard } from '../guards/too-many-articles.guard';
import { AddComponent } from './add/add.component';
import { StockComponent } from './stock.component';

const routes: Routes = [
  { path: '', component: StockComponent },
  { path: 'add', component: AddComponent, canActivate: [] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule {}
