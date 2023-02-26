import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { ThemesModule } from 'ngx-themes-plus';

import { AppComponent } from './app.component';
import { DefaultPageComponent } from './pages/default/default.component';
import { ForcedPageComponent } from './pages/forced/forced.component';

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
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), ThemesModule.forRoot()],
  bootstrap: [AppComponent]
})
export class AppModule {}
