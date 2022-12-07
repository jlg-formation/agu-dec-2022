import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { LegalComponent } from './routes/legal/legal.component';
import { HomeComponent } from './routes/home/home.component';
import { HttpArticleService } from './services/http-article.service';
import { ArticleService } from './services/article.service';

@NgModule({
  declarations: [AppComponent, LegalComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, LayoutModule, HttpClientModule],
  providers: [{ useClass: HttpArticleService, provide: ArticleService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
