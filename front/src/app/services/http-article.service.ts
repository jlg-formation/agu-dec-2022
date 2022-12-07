import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleService } from './article.service';

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
    this.http.get('http://localhost:3000/api/articles').subscribe();
    console.log('refreshed');
  }
}
