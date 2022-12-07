import { Component } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent {
  constructor(protected articleService: ArticleService) {}

  async refresh() {
    await this.articleService.refresh();
  }
}
