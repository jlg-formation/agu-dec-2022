import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, delay, finalize, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-async-btn',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './async-btn.component.html',
  styleUrl: './async-btn.component.scss',
})
export class AsyncBtnComponent {
  constructor(private changeDetector: ChangeDetectorRef) {}

  @Input()
  action: Observable<void> = of(undefined);

  @Input()
  label = '';

  @Input()
  icon = faCircleNotch;

  isInProgress = false;

  faCircleNotch = faCircleNotch;

  doSomethingLong(): void {
    of(undefined)
      .pipe(
        tap(() => {
          console.log('start doing');
          this.isInProgress = true;
        }),
        switchMap(() => this.action),
        tap(() => {
          console.log('end doing');
        }),
        finalize(() => {
          console.log('finalize');
          this.isInProgress = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe();
  }
}
