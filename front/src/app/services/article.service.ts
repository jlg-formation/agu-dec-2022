import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Article, NewArticle } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles$ = new BehaviorSubject<Article[]>(this.load());

  constructor() {
    console.log('instantiate article service');
  }

  add(newArticle: NewArticle): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        const article = { ...newArticle, id: generateId() };
        this.articles$.value.push(article);
        this.articles$.next(this.articles$.value);
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
        this.articles$.next(this.load());
      })
    );
  }

  remove(selectedArticles: Set<Article>): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        this.articles$.next(
          this.articles$.value.filter((a) => !selectedArticles.has(a))
        );
        this.save();
      })
    );
  }

  save() {
    localStorage.setItem('articles', JSON.stringify(this.articles$.value));
  }
}
function generateId() {
  return window.crypto.randomUUID();
}
