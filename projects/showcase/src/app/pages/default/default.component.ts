import { Component } from '@angular/core';
import { ThemeProviderComponent } from 'ngx-themes-plus';

@Component({
  selector: 'app-page-default',
  template: ''
})
export class DefaultPageComponent {
  constructor(private readonly themeProvider: ThemeProviderComponent) {
    this.themeProvider.forcedTheme = '';
  }
}
