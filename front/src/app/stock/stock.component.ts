import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import {
  faCircleNotch,
  faPlus,
  faRotateRight,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { EMPTY, catchError, finalize, of, switchMap, tap } from 'rxjs';
import { Article } from '../interfaces/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      this.refresh();
    }
  }

  @HostListener('click', ['$event.target'])
  onClick() {
    this.clearSelectedArticles();
  }

  refresh(): void {
    of(undefined)
      .pipe(
        switchMap(() => {
          this.isRefreshing = true;
          return this.articleService.refresh();
        }),
        catchError((err) => {
          console.log('err: ', err);
          return of(undefined);
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      )
      .subscribe();
  }

  remove() {
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
          return this.articleService.remove(this.selectedArticles);
        }),
        switchMap(() => this.articleService.refresh()),
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
