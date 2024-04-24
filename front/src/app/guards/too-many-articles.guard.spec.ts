import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tooManyArticlesGuard } from './too-many-articles.guard';

describe('tooManyArticlesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tooManyArticlesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
