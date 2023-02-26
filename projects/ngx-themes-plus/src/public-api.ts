import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ModuleWithProviders, NgModule, PLATFORM_ID } from '@angular/core';

import { ThemeProviderComponent, ThemeSwitcherComponent } from './lib/components';
import { ThemeDirective } from './lib/directives';
import { ThemeOptions } from './lib/models';
import { LocalStorageReferenceService, LocalStorageService } from './lib/services';

export * from './lib/components/theme-provider/theme-provider.component';
export * from './lib/components/theme-switcher/theme-switcher.component';
export * from './lib/directives/theme.directive';
export * from './lib/models/theme-options';

@NgModule({
  declarations: [
    ThemeProviderComponent,
    ThemeSwitcherComponent,
    ThemeDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ThemeProviderComponent,
    ThemeSwitcherComponent,
    ThemeDirective
  ]
})
export class ThemesModule {
  public static forRoot(options: ThemeOptions = new ThemeOptions()): ModuleWithProviders<ThemesModule> {
    return {
      ngModule: ThemesModule,
      providers: [
        LocalStorageService,
        {
          provide: LocalStorageReferenceService,
          useFactory: (PLATFORM_ID: Object) => {
            return isPlatformBrowser(PLATFORM_ID) ? new LocalStorageReferenceService() : null;
          },
          deps: [PLATFORM_ID]
        },
        {
          provide: ThemeOptions,
          useValue: options
        }
      ]
    }
  }
}
