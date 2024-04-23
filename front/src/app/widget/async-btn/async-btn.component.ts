import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Observable, catchError, finalize, of, switchMap, tap } from 'rxjs';

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

  @Output()
  begin = new EventEmitter<void>();

  @Output()
  catch = new EventEmitter<string>();

  isInProgress = false;

  faCircleNotch = faCircleNotch;

  doSomethingLong(): void {
    of(undefined)
      .pipe(
        tap(() => {
          console.log('start doing');
          this.isInProgress = true;
          this.begin.emit();
        }),
        switchMap(() => this.action),
        tap(() => {
          console.log('end doing');
        }),
        catchError((err) => {
          console.log('async btn err: ', err);
          if (err instanceof Error) {
            this.catch.emit(err.message);
          } else if (typeof err === 'string') {
            this.catch.emit(err);
          } else {
            this.catch.emit('Erreur Technique');
          }
          return of(undefined);
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
