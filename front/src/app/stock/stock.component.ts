import { Component, HostListener } from '@angular/core';
import { Article } from '../interfaces/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent {
  selectedArticles = new Set<Article>();

  constructor(protected articleService: ArticleService) {}

  clearSelectedArticles() {
    console.log('clearSelectedArticles');
    this.selectedArticles.clear();
  }

  @HostListener('click', ['$event.target'])
  onClick(event: MouseEvent) {
    this.clearSelectedArticles();
  }

  async refresh() {
    await this.articleService.refresh();
  }

  async remove() {
    await this.articleService.remove(this.selectedArticles);
    this.selectedArticles.clear();
  }

  select(event: MouseEvent, a: Article) {
    event.stopPropagation();
    console.log('event: ', event);
    console.log('select', a);
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }
}
