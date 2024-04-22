import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpArticleService } from './services/http-article.service';
import { ArticleService } from './services/article.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    { useClass: HttpArticleService, provide: ArticleService },
  ],
};
