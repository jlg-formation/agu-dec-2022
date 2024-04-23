import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  delay,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { Article, NewArticle } from '../interfaces/article';
import { ArticleService } from './article.service';

const url = '/api/articles';

@Injectable({
  providedIn: 'root',
})
export class HttpArticleService extends ArticleService {
  constructor(private http: HttpClient) {
    super();
    console.log('instantiate http article service');
    this.refresh().subscribe();
  }

  override refresh(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => this.http.get<Article[]>(url)),
      delay(300),
      map((articles) => {
        console.log('articles: ', articles);
        this.articles$.next(articles);
        this.save();
      }),
      catchError((err) => {
        console.log('err: ', err);
        return throwError(() => err);
      })
    );
  }

  override add(newArticle: NewArticle): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => this.http.post<void>(url, newArticle)),
      delay(300),
      catchError((err) => {
        console.log('err: ', err);
        throw err;
      })
    );
  }

  override remove(selectedArticles: Set<Article>): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        const ids = [...selectedArticles].map((a) => a.id);
        return this.http.delete<Article[]>(url, {
          body: ids,
        });
      }),
      delay(300),
      map(() => {})
    );
  }
}
