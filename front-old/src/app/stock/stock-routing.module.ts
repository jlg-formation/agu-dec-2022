import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { StockComponent } from './stock.component';

const routes: Routes = [
  { path: '', component: StockComponent },
  { path: 'add', component: AddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule {}
