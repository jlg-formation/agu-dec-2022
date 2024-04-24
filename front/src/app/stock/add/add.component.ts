import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NewArticle } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import {
  Observable,
  catchError,
  finalize,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { blackListValidator } from '../../validators/black-list.validator';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  errorMsg = '';
  name = new FormControl('Truc', {
    validators: [Validators.required, Validators.minLength(3)],
    asyncValidators: [blackListValidator(this.articleService)],
    nonNullable: true,
  });
  f = new FormGroup({
    name: this.name,
    price: new FormControl(0, {
      validators: Validators.required,
      nonNullable: true,
    }),
    qty: new FormControl(1, {
      validators: Validators.required,
      nonNullable: true,
    }),
  });
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  isAdding = false;

  route: ActivatedRoute;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private fb: NonNullableFormBuilder
  ) {
    this.route = inject(ActivatedRoute);
  }

  errorPriceMsg() {
    if (this.f.controls['price'].touched) {
      if (this.f.controls['price'].errors?.['required']) {
        return 'Champs requis';
      }
    }
    return '';
  }

  doSomething(event: unknown) {
    console.log('event: ', event);
  }

  submit() {
    return of(undefined)
      .pipe(
        tap(() => {
          console.log('submit');
          if (this.f.invalid) {
            throw new Error('formulaire invalide');
          }
          this.errorMsg = '';
          this.isAdding = true;
        }),
        switchMap(() => {
          const newArticle: NewArticle = this.f.getRawValue();
          return this.articleService.add(newArticle);
        }),
        switchMap(() => this.articleService.refresh()),
        switchMap(() => {
          return this.router.navigate(['..'], { relativeTo: this.route });
        }),
        catchError((err) => {
          console.log('err: ', err);
          if (err instanceof HttpErrorResponse) {
            this.errorMsg = err.error;
          } else if (err instanceof Error) {
            this.errorMsg = err.message;
          }
          return of(undefined);
        }),
        finalize(() => {
          this.isAdding = false;
        }),
        map((x) => {
          return undefined;
        })
      )
      .subscribe();
  }
}
