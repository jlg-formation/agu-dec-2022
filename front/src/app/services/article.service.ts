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

  add2(newArticle: NewArticle): Observable<void> {
    return of(undefined).pipe(
    //   tap(() => {
    //     console.log('hello');
    //   }),
    //   delay(300),
    //   tap(() => {
    //     console.log('coucou');
    //   }),
    //   switchMap(() => {
    //     return this.http.get(url);
    //   }),
    //   switchMap((xxx) => {
    //     return this.http.get(url);
    //   }),
    //   switchMap((yyy) => {
    //     return this.http.get(url);
    //   }),
    //   switchMap(() => {
    //     return this.http.get(url);
    //   }),
    //   tap(() => {
    //     console.log('coucou');
    //   }),

    //   catchError((err) => {
    //     console.log('err: ', err);
    //     return of(undefined);
    //   }),
    //   finalize(() => {})
    // );
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
