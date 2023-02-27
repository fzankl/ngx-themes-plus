import { Component, Input, OnDestroy } from '@angular/core';
import { filter, fromEvent, Observable, Subject, Subscription } from 'rxjs';

import { ThemeOptions } from '../../models';
import { LocalStorageService } from '../../services';

const colorSchemes = ['light', 'dark'];
const mediaQuery = '(prefers-color-scheme: dark)';

@Component({
  selector: 'tp-theme-provider',
  template: '<ng-content></ng-content>'
})
export class ThemeProviderComponent implements OnDestroy {
  /** @internal */
  public hasForcedTheme = false;
  public themeChanged$: Observable<string>;

  private currentTheme = '';
  private storageSubscription?: Subscription;
  private mediaQuerySubscription?: Subscription;
  private themeChanged: Subject<string> = new Subject();

  constructor(private readonly localStorageService: LocalStorageService, private readonly options: ThemeOptions) {
    this.themeChanged$ = this.themeChanged.asObservable();

    this.storageSubscription = this.localStorageService.storage$.pipe(filter(() => this.options !== undefined)).subscribe({
      next: (item) => {
        if (item?.key === this.options.storageKey) {
          const theme = item.value || this.options.defaultTheme;
          this.applyTheme(theme, true);
        }
      }
    });

    if (this.options.enableSystem) {
      this.mediaQuerySubscription = fromEvent<MediaQueryList>(window.matchMedia(mediaQuery), 'change')
        .pipe(filter(() => this.options !== undefined && !this.hasForcedTheme))
        .subscribe({
          next: () => {
            this.applyTheme('system', true);
          }
        });
    }

    const theme = this.getTheme(options.defaultTheme);
    this.applyTheme(theme, true);
  }

  public ngOnDestroy(): void {
    if (this.storageSubscription) {
      this.storageSubscription.unsubscribe();
      this.storageSubscription = undefined;
    }

    if (this.mediaQuerySubscription) {
      this.mediaQuerySubscription.unsubscribe();
      this.mediaQuerySubscription = undefined;
    }

    this.themeChanged.complete();
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
  public applyTheme(theme: string, shouldPersist = true): void {
    let resolved = theme;

    if (!resolved) {
      return;
    }

    if (theme === 'system' && this.options.enableSystem) {
      resolved = this.getSystemTheme();
    }

    const name = resolved;
    const attrs = this.options.themes;
    const doc = document.documentElement;

    if (this.options.attribute === 'class') {
      doc.classList.remove(...attrs);

      if (name) {
        doc.classList.add(name);
      }
    } else {
      if (name) {
        doc.setAttribute(this.options.attribute, name);
      } else {
        doc.removeAttribute(this.options.attribute);
      }
    }

    if (this.options.enableColorScheme) {
      const fallback = colorSchemes.includes(this.options.defaultTheme) ? this.options.defaultTheme : null;
      const colorScheme = colorSchemes.includes(resolved) ? resolved : fallback;

      if (colorScheme) {
        doc.style.colorScheme = colorScheme;
      } else {
        doc.style.colorScheme = '';
      }
    }

    this.setTheme(theme, shouldPersist);
    this.currentTheme = resolved;
    this.themeChanged?.next(resolved);
  }

  private setTheme(theme: string, shouldPersist: boolean): void {
    if (shouldPersist) {
      this.localStorageService.setItem(this.options.storageKey, theme);
    }
  }

  private getTheme(fallback: string): string {
    const theme = localStorage.getItem(this.options.storageKey) || undefined;
    return theme || fallback;
  }

  private getSystemTheme(e?: MediaQueryList | MediaQueryListEvent): string {
    if (!e) {
      e = window.matchMedia(mediaQuery);
    }

    const isDark = e.matches;
    const systemTheme = isDark ? 'dark' : 'light';

    return systemTheme;
  }
}
