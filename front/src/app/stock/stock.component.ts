import { Component } from '@angular/core';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent {
  articles: Article[] = [
    { name: 'Tournevis', price: 2.99, qty: 123 },
    { name: 'Pelle', price: 3, qty: 45 },
  ];
}
