import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  f = new FormGroup({
    name: new FormControl('Truc', [
      Validators.required,
      Validators.minLength(3),
    ]),
    price: new FormControl(0, Validators.required),
    qty: new FormControl(1, Validators.required),
  });
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  isAdding = false;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  doSomething(event: unknown) {
    console.log('event: ', event);
  }

  submit() {
    return of(undefined)
      .pipe(
        tap(() => {
          console.log('submit');
          this.errorMsg = '';
          this.isAdding = true;
        }),
        switchMap(() => {
          const newArticle = this.f.value as NewArticle;
          return this.articleService.add2(newArticle);
        }),
        switchMap(() => this.articleService.refresh2()),
        switchMap(() =>
          this.router.navigate(['..'], { relativeTo: this.route })
        ),
        catchError((err) => {
          console.log('err: ', err);
          if (err instanceof HttpErrorResponse) {
            this.errorMsg = err.error;
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
