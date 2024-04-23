import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import { of } from 'rxjs';

@Component({
  selector: 'app-async-btn',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './async-btn.component.html',
  styleUrl: './async-btn.component.scss',
})
export class AsyncBtnComponent {
  @Input()
  label = '';

  @Input()
  icon = faCircleNotch;

  isInProgress = false;

  faCircleNotch = faCircleNotch;

  doSomethingLong(): void {
    of(undefined).pipe().subscribe();
  }
}
