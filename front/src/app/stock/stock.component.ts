import { Component, HostListener } from '@angular/core';
import {
  faCircleNotch,
  faPlus,
  faRotateRight,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import {
  EMPTY,
  catchError,
  finalize,
  lastValueFrom,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Article } from '../interfaces/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent {
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashCan = faTrashCan;
  faCircleNotch = faCircleNotch;
  isRefreshing = false;
  isRemoving = false;
  selectedArticles = new Set<Article>();

  constructor(protected articleService: ArticleService) {}

  clearSelectedArticles() {
    console.log('clearSelectedArticles');
    this.selectedArticles.clear();
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('event.key: ', event.key);
    if (event.key === 'r') {
      (async () => {
        await this.refresh();
      })();
    }
  }

  @HostListener('click', ['$event.target'])
  onClick() {
    this.clearSelectedArticles();
  }

  async refresh() {
    try {
      this.isRefreshing = true;
      await lastValueFrom(this.articleService.refresh2());
    } catch (err) {
      console.log('err: ', err);
    } finally {
      this.isRefreshing = false;
    }
  }

  async remove() {
    try {
      this.isRemoving = true;
      await this.articleService.remove(this.selectedArticles);
      await lastValueFrom(this.articleService.refresh2());
      this.selectedArticles.clear();
    } catch (err) {
      console.log('err: ', err);
    } finally {
      this.isRemoving = false;
    }
  }

  remove2() {
    return of(undefined)
      .pipe(
        switchMap(() => {
          const answer = window.confirm("t'es sur ?");
          console.log('answer: ', answer);
          if (answer === false) {
            this.selectedArticles.clear();
            return EMPTY;
          }
          this.isRemoving = true;
          return this.articleService.remove2(this.selectedArticles);
        }),
        switchMap(() => this.articleService.refresh2()),
        tap(() => {
          this.selectedArticles.clear();
        }),
        catchError((err) => {
          console.log('err: ', err);
          return of(undefined);
        }),
        finalize(() => {
          this.isRemoving = false;
        })
      )
      .subscribe();
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
