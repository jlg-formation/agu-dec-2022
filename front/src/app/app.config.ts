import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpArticleService } from './services/http-article.service';
import { ArticleService } from './services/article.service';
import { registerLocaleData } from '@angular/common';
import localeFrBE from '@angular/common/locales/fr-BE';

// the second parameter 'fr' is optional
registerLocaleData(localeFrBE, 'fr-BE');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    { useClass: HttpArticleService, provide: ArticleService },
    { provide: LOCALE_ID, useValue: 'fr-BE' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
  ],
};
