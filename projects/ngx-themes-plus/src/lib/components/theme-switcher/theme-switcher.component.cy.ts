import { MountConfig } from 'cypress/angular';

import { ThemeOptions } from '../../models'
import { LocalStorageReferenceService, LocalStorageService } from '../../services'
import { ThemeProviderComponent } from '../theme-provider/theme-provider.component';
import { ThemeSwitcherComponent } from './theme-switcher.component';

describe('ThemeSwitcherComponent', () => {
  const config: MountConfig<ThemeSwitcherComponent> = {
    declarations: [ThemeSwitcherComponent],
    providers: [
      ThemeProviderComponent,
      LocalStorageService,
      LocalStorageReferenceService,
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
    cy.mount(ThemeSwitcherComponent, config);

    cy.get('svg#lightIcon').should('be.visible');
    cy.get('button').click();
    cy.get('svg#darkIcon').should('be.visible');
  });
});
