import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  errorMsg = '';
  f = this.fb.group({
    name: ['Truc', [Validators.required, Validators.minLength(3)]],
    price: [0, Validators.required],
    qty: [1, Validators.required],
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
