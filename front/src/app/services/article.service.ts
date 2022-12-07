import { Injectable } from '@angular/core';
import { Article, NewArticle } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = this.load();

  constructor() {
    console.log('instantiate article service');
  }

  load(): Article[] {
    const str = localStorage.getItem('articles');
    if (str === null) {
      return [
        { id: 'a1', name: 'Tournevis', price: 2.99, qty: 123 },
        { id: 'a2', name: 'Pelle', price: 3, qty: 45 },
      ];
    }
    return JSON.parse(str);
  }

  async add(newArticle: NewArticle) {
    const article = { ...newArticle, id: generateId() };
    this.articles.push(article);
    this.save();
  }

  save() {
    localStorage.setItem('articles', JSON.stringify(this.articles));
  }
}
function generateId() {
  return Date.now() + '_' + Math.floor(Math.random() * 1e9);
}
