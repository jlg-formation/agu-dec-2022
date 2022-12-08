import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NewArticle } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  errorMsg = '';
  isAdding = false;
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  f = new FormGroup({
    name: new FormControl('Truc', [
      Validators.required,
      Validators.minLength(3),
    ]),
    price: new FormControl(0, Validators.required),
    qty: new FormControl(1, Validators.required),
  });

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
