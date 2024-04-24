import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { map, of, switchMap, tap } from 'rxjs';

export const tooManyArticlesGuard: CanActivateFn = (route, state) => {
  const articleService = inject(ArticleService);
  const router = inject(Router);
  return of(undefined).pipe(
    tap(() => {
      console.log('articleService: ', articleService);
      console.log('tooManyArticlesGuard');
    }),
    switchMap(() => {
      return articleService.refresh();
    }),
    map(() => {
      if (articleService.articles$.value.length >= 5) {
        return router.createUrlTree(['legal']);
      }
      return true;
    })
  );
};
