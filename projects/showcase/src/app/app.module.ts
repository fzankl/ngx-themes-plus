import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { ThemeOptions, ThemesModule } from 'ngx-themes-plus';

import { AppComponent } from './app.component';
import { DefaultPageComponent } from './pages/default/default.component';
import { ForcedPageComponent } from './pages/forced/forced.component';

const options = new ThemeOptions();
options.defaultTheme = "light";
options.themes = [...options.themes, 'purple'];

const routes: Routes = [
  {
    path: 'default',
    component: DefaultPageComponent
  },
  {
    path: 'forced',
    component: ForcedPageComponent
  },
  {
    path: '**',
    redirectTo: '/default'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ThemesModule.forRoot(options)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
