import { Component, OnDestroy } from '@angular/core';
import { ThemeProviderComponent } from 'ngx-themes-plus';

@Component({
  selector: 'app-page-forced',
  template: ''
})
export class ForcedPageComponent implements OnDestroy {
  constructor(private readonly themeProvider: ThemeProviderComponent) {
    this.themeProvider.forcedTheme = 'dark';
  }

  public ngOnDestroy(): void {
    this.themeProvider.forcedTheme = '';
  }
}
