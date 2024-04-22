import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, lastValueFrom } from 'rxjs';
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
    this.refresh();
  }

  override async refresh(): Promise<void> {
    try {
      const articles = await lastValueFrom(
        this.http.get<Article[]>(url).pipe(delay(300))
      );
      console.log('articles: ', articles);
      this.articles = articles;
      this.save();
    } catch (err) {
      console.log('err: ', err);
    }
  }

  override async add(newArticle: NewArticle): Promise<void> {
    await lastValueFrom(
      this.http.post<Article[]>(url, newArticle).pipe(delay(300))
    );
  }

  override async remove(selectedArticles: Set<Article>): Promise<void> {
    const ids = [...selectedArticles].map((a) => a.id);
    await lastValueFrom(
      this.http
        .delete<Article[]>(url, {
          body: ids,
        })
        .pipe(delay(300))
    );
  }
}
