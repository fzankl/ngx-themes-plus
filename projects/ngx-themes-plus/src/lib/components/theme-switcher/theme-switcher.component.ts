import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ThemeOptions } from '../../models';

import { ThemeProviderComponent } from '..';

@Component({
  selector: 'tp-theme-switcher',
  templateUrl: 'theme-switcher.component.html',
  styleUrls: ['theme-switcher.component.scss'],
  standalone: false
})
export class ThemeSwitcherComponent implements OnDestroy {
  protected isThemeSelectorVisible = false;
  protected hasDefaultThemesOnly = true;

  private themeChangedSubscription?: Subscription;

  constructor(
    private readonly themeProvider: ThemeProviderComponent,
    private readonly themeOptions: ThemeOptions,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.hasDefaultThemesOnly =
      this.themeOptions.themes.length === 2 && this.themeOptions.themes.filter((x) => x === 'light' || x === 'dark').length === 2;

    // Theme changes may happen outside of a change detection cycle (e.g. forced theme, system theme, storage events),
    // so the view has to be marked explicitly to support zoneless applications.
    this.themeChangedSubscription = this.themeProvider.themeChanged$.subscribe({
      next: () => this.changeDetectorRef.markForCheck()
    });
  }

  public ngOnDestroy(): void {
    if (this.themeChangedSubscription) {
      this.themeChangedSubscription.unsubscribe();
      this.themeChangedSubscription = undefined;
    }
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
