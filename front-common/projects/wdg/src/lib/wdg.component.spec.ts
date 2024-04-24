import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdgComponent } from './wdg.component';

describe('WdgComponent', () => {
  let component: WdgComponent;
  let fixture: ComponentFixture<WdgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WdgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WdgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
