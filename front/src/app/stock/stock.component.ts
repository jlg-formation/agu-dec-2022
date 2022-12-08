import { Component, HostListener } from '@angular/core';
import {
  faPlus,
  faRotateRight,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { Article } from '../interfaces/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent {
  isRefreshing = false;
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashCan = faTrashCan;
  selectedArticles = new Set<Article>();

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('event.key: ', event.key);
    if (event.key === 'r') {
      (async () => {
        await this.refresh();
      })();
    }
  }

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
    try {
      this.isRefreshing = true;
      await this.articleService.refresh();
    } catch (err) {
      console.log('err: ', err);
    } finally {
      this.isRefreshing = false;
    }
  }

  async remove() {
    await this.articleService.remove(this.selectedArticles);
    this.selectedArticles.clear();
    await this.articleService.refresh();
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
