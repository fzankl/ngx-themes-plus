import { Component } from '@angular/core';
import { ThemeProviderComponent } from 'ngx-themes-plus';

@Component({
  selector: 'app-page-forced',
  template: ''
})
export class ForcedPageComponent {
  constructor(private readonly themeProvider: ThemeProviderComponent) {
    this.themeProvider.forcedTheme = 'dark';
  }
}
