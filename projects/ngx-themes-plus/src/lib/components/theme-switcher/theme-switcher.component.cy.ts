import { Component } from '@angular/core';
import { MountConfig } from 'cypress/angular';
import { Observable, Subject } from 'rxjs';

import { ThemeOptions } from '../../models';
import { LocalStorageReferenceService, LocalStorageService } from '../../services';
import { ThemeProviderComponent, ThemeSwitcherComponent } from '../../components';

@Component({
  selector: 'theme-provider',
  template: '<ng-content></ng-content>'
})
class MockThemeProviderComponent {
  public themeChanged$: Observable<string>;
  public theme = '';
  public hasForcedTheme = false;

  private themeChanged: Subject<string> = new Subject();

  constructor() {
    this.themeChanged$ = this.themeChanged.asObservable();
  }

  public applyTheme(theme: string): void {
    this.theme = theme;
  }
}

describe('ThemeSwitcherComponent', () => {
  const config: MountConfig<ThemeSwitcherComponent> = {
    declarations: [ThemeSwitcherComponent],
    providers: [
      LocalStorageService,
      LocalStorageReferenceService,
      {
        provide: ThemeProviderComponent,
        useClass: MockThemeProviderComponent
      },
      {
        provide: ThemeOptions,
        useValue: new ThemeOptions()
      }
    ]
  };

  it('should mount', () => {
    cy.mount('<theme-switcher></theme-switcher>', config);
  });

  it('should toogle icon when switching between light and dark mode', () => {
    const themeProvider = new MockThemeProviderComponent();
    themeProvider.theme = 'light';

    cy.mount(ThemeSwitcherComponent, {
      ...config,
      providers: [
        ...(config.providers ?? []),
        {
          provide: ThemeProviderComponent,
          useValue: themeProvider
        }
      ]
    });

    cy.get('svg#lightIcon').should('be.visible');
    cy.get('button').click();
    cy.get('svg#darkIcon').should('be.visible');
  });

  it('should be disabled when theme is forced', () => {
    const themeProvider = new MockThemeProviderComponent();
    themeProvider.theme = 'light';
    themeProvider.hasForcedTheme = true;

    cy.mount(ThemeSwitcherComponent, {
      ...config,
      providers: [
        ...(config.providers ?? []),
        {
          provide: ThemeProviderComponent,
          useValue: themeProvider
        }
      ]
    });

    cy.get('button').should('be.disabled');
  });

  it('should show theme-selector when custom themes are used', () => {
    const options = new ThemeOptions();
    options.themes = [...options.themes, 'yellow'];

    cy.mount(ThemeSwitcherComponent, {
      ...config,
      providers: [
        ...(config.providers ?? []),
        {
          provide: ThemeOptions,
          useValue: options
        }
      ]
    });

    cy.get('svg#brushIcon').should('be.visible');
    cy.get('svg#lightIcon').should('not.exist');
    cy.get('svg#darkIcon').should('not.exist');
  });
});
