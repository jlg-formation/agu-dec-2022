import { TestBed } from '@angular/core/testing';

import { WdgService } from './wdg.service';

describe('WdgService', () => {
  let service: WdgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WdgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
