/// <reference types="@angular/localize" />

import { isDevMode } from '@angular/core';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

if (!isDevMode()) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.log = () => {};
}

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
