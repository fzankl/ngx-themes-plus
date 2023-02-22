import { Component,Input, OnDestroy } from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';

import { ThemeOptions } from '../../models';
import { LocalStorageService } from '../../services';

/**
 * Color schemes supported by the browser.
 */
const colorSchemes = ['light', 'dark'];

@Component({
  selector: 'theme-provider',
  template: '<ng-content></ng-content>'
})
export class ThemeProviderComponent implements OnDestroy {
  /** @internal */
  public hasForcedTheme: boolean = false;

  private currentTheme: string = '';
  private destroyed$: Subject<unknown> = new Subject();

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly options: ThemeOptions) {

    this.localStorageService.storage$.pipe(
      takeUntil(this.destroyed$),
      filter(() => this.options !== undefined)
    ).subscribe({
      next: (item) => {
        if (item?.key === this.options.storageKey) {
          const theme = item.value || this.options.defaultTheme;
          this.applyTheme(theme, true);
        }
      }
    });

    const theme = this.getTheme(options.defaultTheme);
    this.applyTheme(theme, true);
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(undefined);
    this.destroyed$.complete();
  }

  /**
   * Gets the current applied theme for the current page.
   */
  public get theme(): string {
    return this.currentTheme;
  }

  /**
   * Sets the forced theme for the current page.
   * (Does not modify saved theme settings)
   */
  @Input()
  public set forcedTheme(value: string | undefined) {
    if (value) {
      this.hasForcedTheme = true;
      this.applyTheme(value, false);

      return;
    }

    this.hasForcedTheme = false;
    this.applyTheme(this.getTheme(this.options.defaultTheme));
  }

  /** @internal */
  public applyTheme(theme: string, shouldPersist: boolean = true): void {
    let resolved = theme;

    if (!resolved) {
      return;
    }

    if (theme === 'system' && this.options.enableSystem) {
      resolved = this.getSystemTheme()
    }

    const name = resolved;
    const attrs = this.options.themes;
    const doc = document.documentElement

    if (this.options.attribute === 'class') {
      doc.classList.remove(...attrs)

      if (name) {
        doc.classList.add(name)
      }
    } else {
      if (name) {
        doc.setAttribute(this.options.attribute, name)
      } else {
        doc.removeAttribute(this.options.attribute)
      }
    }

    if (this.options.enableColorScheme) {
      const fallback = colorSchemes.includes(this.options.defaultTheme) ? this.options.defaultTheme : null;
      const colorScheme = colorSchemes.includes(resolved) ? resolved : fallback;

      if (colorScheme) {
        doc.style.colorScheme = colorScheme;
      }
    }

    this.setTheme(resolved, shouldPersist);
  }

  private setTheme(theme: string, shouldPersist: boolean): void {
    this.currentTheme = theme;

    if (shouldPersist) {
      this.localStorageService.setItem(this.options.storageKey, theme);
    }
  }

  private getTheme(fallback: string): string {
    const theme = localStorage.getItem(this.options.storageKey) || undefined;
    return theme || fallback
  }

  private getSystemTheme(e?: MediaQueryList | MediaQueryListEvent): string {
    if (!e) {
      e = window.matchMedia('(prefers-color-scheme: dark)');
    }

    const isDark = e.matches;
    const systemTheme = isDark ? 'dark' : 'light';

    return systemTheme;
  }
}
