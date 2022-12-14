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

  async add(newArticle: NewArticle) {
    const article = { ...newArticle, id: generateId() };
    this.articles.push(article);
    this.save();
  }

  load(): Article[] {
    const str = localStorage.getItem('articles');
    if (str === null) {
      return [];
    }
    return JSON.parse(str);
  }

  async refresh() {
    this.articles = this.load();
  }

  async remove(selectedArticles: Set<Article>) {
    this.articles = this.articles.filter((a) => !selectedArticles.has(a));
    this.save();
  }

  save() {
    localStorage.setItem('articles', JSON.stringify(this.articles));
  }
}
function generateId() {
  return Date.now() + '_' + Math.floor(Math.random() * 1e9);
}
