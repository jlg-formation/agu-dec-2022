import { Injectable } from '@angular/core';
import { Article, NewArticle } from '../interfaces/article';
import {
  Observable,
  catchError,
  delay,
  finalize,
  of,
  switchMap,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = this.load();

  constructor() {
    console.log('instantiate article service');
  }

  add(newArticle: NewArticle): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        const article = { ...newArticle, id: generateId() };
        this.articles.push(article);
        this.save();
      })
    );
  }

  load(): Article[] {
    const str = localStorage.getItem('articles');
    if (str === null) {
      return [];
    }
    return JSON.parse(str);
  }

  refresh(): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        this.articles = this.load();
      })
    );
  }

  remove(selectedArticles: Set<Article>): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        this.articles = this.articles.filter((a) => !selectedArticles.has(a));
        this.save();
      })
    );
  }

  save() {
    localStorage.setItem('articles', JSON.stringify(this.articles));
  }
}
function generateId() {
  return Date.now() + '_' + Math.floor(Math.random() * 1e9);
}
