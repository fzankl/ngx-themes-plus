import { Component } from '@angular/core';

import { ThemeProviderComponent } from '..';

@Component({
  selector: 'theme-switcher',
  templateUrl: 'theme-switcher.component.html',
  styleUrls: ['theme-switcher.component.scss']
})
export class ThemeSwitcherComponent {
  constructor(private readonly themeProvider: ThemeProviderComponent) { }

  public get currentTheme(): string {
    return this.themeProvider.theme;
  }

  public get hasForcedTheme(): boolean {
    return this.themeProvider.hasForcedTheme;
  }

  public setTheme(theme: string): void {
    if (this.hasForcedTheme) {
      return;
    }

    this.themeProvider.applyTheme(theme);
  }
}
