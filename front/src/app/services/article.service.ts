import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = [
    { name: 'Tournevis', price: 2.99, qty: 123 },
    { name: 'Pelle', price: 3, qty: 45 },
  ];
  constructor() {
    console.log('instantiate article service');
  }
}
