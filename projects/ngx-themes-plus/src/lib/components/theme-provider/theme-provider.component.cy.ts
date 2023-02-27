import { MountConfig } from 'cypress/angular';

import { ThemeOptions } from '../../models';
import { LocalStorageReferenceService, LocalStorageService } from '../../services';
import { ThemeProviderComponent } from './theme-provider.component';

describe('ThemeProviderComponent', () => {
  const themeOptions = new ThemeOptions();

  const config: MountConfig<ThemeProviderComponent> = {
    declarations: [ThemeProviderComponent],
    providers: [
      LocalStorageService,
      LocalStorageReferenceService,
      {
        provide: ThemeOptions,
        useValue: themeOptions
      }
    ]
  };

  it('should mount', () => {
    cy.mount('<tp-theme-provider></tp-theme-provider>', config);
  });

  it('should apply forced theme', () => {
    themeOptions.defaultTheme = 'light';
    themeOptions.enableSystem = false;

    cy.mount(ThemeProviderComponent, {
      ...config,
      componentProperties: {
        forcedTheme: 'dark'
      }
    });

    cy.get('html').should('have.attr', 'data-theme', 'dark');
    cy.get('html').should('have.css', 'color-scheme').and('match', /dark/);
  });
});
