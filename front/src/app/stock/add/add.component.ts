import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NewArticle } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WidgetModule } from '../../widget/widget.module';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, WidgetModule, ReactiveFormsModule],
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

  async submit() {
    try {
      console.log('submit');
      this.errorMsg = '';
      this.isAdding = true;
      const newArticle = this.f.value as NewArticle;
      await this.articleService.add(newArticle);
      await this.articleService.refresh();
      await this.router.navigate(['..'], { relativeTo: this.route });
    } catch (err) {
      console.log('err: ', err);
      if (err instanceof HttpErrorResponse) {
        this.errorMsg = err.error;
      }
    } finally {
      this.isAdding = false;
    }
  }
}
