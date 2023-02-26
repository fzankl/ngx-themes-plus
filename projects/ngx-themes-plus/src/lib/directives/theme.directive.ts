import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { ThemeProviderComponent } from '../components/theme-provider/theme-provider.component';

@Directive({
  selector: '[ngxThemesPlusOnly],[ngxThemesPlusExcept]'
})
export class ThemeDirective implements OnInit, OnDestroy {
  private themesExcept?: string | string[];
  private themesOnly?: string | string[];
  private themeChangedSubscription?: Subscription;

  constructor(
    private readonly themeProvider: ThemeProviderComponent,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<HTMLElement>) {}

  @Input()
  public set ngxThemesPlusOnly(value: string | string[]) {
    this.themesOnly = value;
    this.updateView();
  }

  @Input()
  public set ngxThemesPlusExcept(value: string | string[]) {
    this.themesExcept = value;
    this.updateView();
  }

  public ngOnInit(): void {
    this.themeChangedSubscription = this.themeProvider.themeChanged$.subscribe({
      next: () => this.updateView()
    });
  }

  public ngOnDestroy(): void {
    if (this.themeChangedSubscription) {
      this.themeChangedSubscription.unsubscribe();
      this.themeChangedSubscription = undefined;
    }
  }

  private updateView(): void {
    this.viewContainerRef.clear();

    const isThemesOnlyEmpty = !this.themesOnly || (Array.isArray(this.themesOnly) && this.themesOnly.length === 0);
    const isThemesExceptEmpty = !this.themesExcept || (Array.isArray(this.themesExcept) && this.themesExcept.length === 0);

    if (isThemesOnlyEmpty && isThemesExceptEmpty) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      return;
    }

    if (!isThemesOnlyEmpty) {
      // @ts-ignore - themesOnly is defined in this branch
      const themes = this.transformStringToArray(this.themesOnly);

      if (themes.indexOf(this.themeProvider.theme) !== -1) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }

      return;
    }

    if (!isThemesExceptEmpty) {
      // @ts-ignore - themesExcept is defined in this branch
      const themes = this.transformStringToArray(this.themesExcept);

      if (themes.indexOf(this.themeProvider.theme) === -1) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }

      return;
    }
  }

  private transformStringToArray(value: string | string[]): string[] {
    if (this.isString(value)) {
        return [value];
    }

    return value;
  }

  private isString(value: any): value is string {
    return !!value && typeof value === 'string';
  }
}
