import { AsyncValidatorFn } from '@angular/forms';
import { delay, map, of } from 'rxjs';
import { ArticleService } from '../services/article.service';

export const blackListValidator =
  (articleService: ArticleService): AsyncValidatorFn =>
  (control) => {
    return of(undefined).pipe(
      delay(2000),
      map(() => {
        console.log('articleService: ', articleService);
        const blackList = new Set(['salad', 'carrot']);
        if (blackList.has(control.value)) {
          return { blackList: { tata: 345 } };
        }
        return null;
      })
    );
  };
