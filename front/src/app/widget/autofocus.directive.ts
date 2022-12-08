import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements OnInit, AfterViewInit {
  @Input()
  selectAll = false;

  @Output()
  empty = new EventEmitter<string>();

  constructor(private elt: ElementRef<HTMLElement>) {
    console.log('directive autofocus instantiated.');
    console.log('constructor selectAll: ', this.selectAll);
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit selectAll: ', this.selectAll);
  }

  ngOnInit(): void {
    console.log('ngOnInit selectAll: ', this.selectAll);
    if (this.elt.nativeElement instanceof HTMLInputElement) {
      let previousVal = this.elt.nativeElement.value;
      this.elt.nativeElement.addEventListener('input', () => {
        const elt = this.elt.nativeElement as HTMLInputElement;
        console.log('this.elt.nativeElement.value: ', elt.value);
        if (elt.value === '') {
          this.empty.emit(previousVal);
          return;
        }
        previousVal = elt.value;
      });
    }

    if (this.selectAll && this.elt.nativeElement instanceof HTMLInputElement) {
      this.elt.nativeElement.select();
      return;
    }
    this.elt.nativeElement.focus();
  }
}
