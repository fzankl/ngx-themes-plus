import { Component } from '@angular/core';
import { ThemeOptions } from '../../models';

import { ThemeProviderComponent } from '..';

@Component({
  selector: 'theme-switcher',
  templateUrl: 'theme-switcher.component.html',
  styleUrls: ['theme-switcher.component.scss']
})
export class ThemeSwitcherComponent {
  protected isThemeSelectorVisible = false;
  protected hasDefaultThemesOnly = true;

  constructor(private readonly themeProvider: ThemeProviderComponent, private readonly themeOptions: ThemeOptions) {
    this.hasDefaultThemesOnly = this.themeOptions.themes.length === 2 && this.themeOptions.themes.filter(x => x === 'light' || x === 'dark').length === 2;
  }

  protected get themes(): string[] {
    return this.themeOptions.themes;
  }

  protected get currentTheme(): string {
    return this.themeProvider.theme;
  }

  protected get hasForcedTheme(): boolean {
    return this.themeProvider.hasForcedTheme;
  }

  protected setTheme(theme: string): void {
    if (this.hasForcedTheme) {
      return;
    }

    this.themeProvider.applyTheme(theme);
    this.hideThemeSelector();
  }

  protected toggleThemeSelector(): void {
    this.isThemeSelectorVisible = !this.isThemeSelectorVisible;
  }

  protected hideThemeSelector(): void {
    this.isThemeSelectorVisible = false;
  }
}
