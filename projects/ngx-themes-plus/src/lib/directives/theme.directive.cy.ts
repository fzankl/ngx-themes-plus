import { Component } from "@angular/core";
import { MountConfig } from "cypress/angular";
import { Observable, Subject } from "rxjs";

import { ThemeDirective } from './theme.directive';
import { ThemeProviderComponent } from "../components";
import { LocalStorageReferenceService, LocalStorageService } from "../services";

@Component({
  selector: 'theme-provider',
  template: '<ng-content></ng-content>'
})
class MockThemeProviderComponent {
  public themeChanged$: Observable<string>;

  private themeChanged: Subject<string> = new Subject();
  private currentTheme: string = '';

  constructor() {
    this.themeChanged$ = this.themeChanged.asObservable();
  }

  public get theme(): string {
    return this.currentTheme;
  }

  public set theme(value: string) {
    this.currentTheme = value;
  }
}

describe('Theme directive only', () => {
  @Component({
    selector: 'ngx-theme-plus-test-comp',
    template: `<div *ngxThemesPlusOnly="'dark'" data-cy="element">Test</div>`
  })
  class TestComponent {}

  const config: MountConfig<TestComponent> = {
    declarations: [ThemeDirective, TestComponent],
    providers: [
      LocalStorageService,
      LocalStorageReferenceService
    ]
  };

  it('should mount', () => {
    cy.mount(TestComponent, {
      ...config,
      providers: [
        {
          provide: ThemeProviderComponent,
          useClass: MockThemeProviderComponent
        }
      ]
    });
  });

  it('should render the component', () => {
    const themeProvider = new MockThemeProviderComponent();
    themeProvider.theme = 'dark';

    cy.mount(TestComponent, {
      ...config,
      providers: [
        {
          provide: ThemeProviderComponent,
          useValue: themeProvider
        }
      ]
    });

    cy.get('[data-cy=element]').should('exist');
  });

  it('should not render the component', () => {
    const themeProvider = new MockThemeProviderComponent();
    themeProvider.theme = 'light';

    cy.mount(TestComponent, {
      ...config,
      providers: [
        {
          provide: ThemeProviderComponent,
          useValue: themeProvider
        }
      ]
    });

    cy.get('[data-cy=element]').should('not.exist');
  });
});

describe('Theme directive only as array', () => {
  @Component({
    selector: 'ngx-theme-plus-test-comp',
    template: `<div *ngxThemesPlusOnly="['dark', 'red']" data-cy="element">Test</div>`
  })
  class TestComponent {}

  const config: MountConfig<TestComponent> = {
    declarations: [ThemeDirective, TestComponent],
    providers: [
      LocalStorageService,
      LocalStorageReferenceService
    ]
  };

  it('should mount', () => {
    cy.mount(TestComponent, {
      ...config,
      providers: [
        {
          provide: ThemeProviderComponent,
          useClass: MockThemeProviderComponent
        }
      ]
    });
  });

  it('should render the component', () => {
    const themeProvider = new MockThemeProviderComponent();
    themeProvider.theme = 'dark';

    cy.mount(TestComponent, {
      ...config,
      providers: [
        {
          provide: ThemeProviderComponent,
          useValue: themeProvider
        }
      ]
    });

    cy.get('[data-cy=element]').should('exist');
  });

  it('should not render the component', () => {
    const themeProvider = new MockThemeProviderComponent();
    themeProvider.theme = 'light';

    cy.mount(TestComponent, {
      ...config,
      providers: [
        {
          provide: ThemeProviderComponent,
          useValue: themeProvider
        }
      ]
    });

    cy.get('[data-cy=element]').should('not.exist');
  });
});

describe('Theme directive except', () => {
  @Component({
    selector: 'ngx-theme-plus-test-comp',
    template: `<div *ngxThemesPlusExcept="'dark'" data-cy="element">Test</div>`
  })
  class TestComponent {}

  const config: MountConfig<TestComponent> = {
    declarations: [ThemeDirective, TestComponent],
    providers: [
      LocalStorageService,
      LocalStorageReferenceService
    ]
  };

  it('should mount', () => {
    cy.mount(TestComponent, {
      ...config,
      providers: [
        {
          provide: ThemeProviderComponent,
          useClass: MockThemeProviderComponent
        }
      ]
    });
  });

  it('should render the component', () => {
    const themeProvider = new MockThemeProviderComponent();
    themeProvider.theme = 'light';

    cy.mount(TestComponent, {
      ...config,
      providers: [
        {
          provide: ThemeProviderComponent,
          useValue: themeProvider
        }
      ]
    });

    cy.get('[data-cy=element]').should('exist');
  });

  it('should not render the component', () => {
    const themeProvider = new MockThemeProviderComponent();
    themeProvider.theme = 'dark';

    cy.mount(TestComponent, {
      ...config,
      providers: [
        {
          provide: ThemeProviderComponent,
          useValue: themeProvider
        }
      ]
    });

    cy.get('[data-cy=element]').should('not.exist');
  });
});

describe('Theme directive except as array', () => {
  @Component({
    selector: 'ngx-theme-plus-test-comp',
    template: `<div *ngxThemesPlusExcept="['dark', 'red']" data-cy="element">Test</div>`
  })
  class TestComponent {}

  const config: MountConfig<TestComponent> = {
    declarations: [ThemeDirective, TestComponent],
    providers: [
      LocalStorageService,
      LocalStorageReferenceService
    ]
  };

  it('should mount', () => {
    cy.mount(TestComponent, {
      ...config,
      providers: [
        {
          provide: ThemeProviderComponent,
          useClass: MockThemeProviderComponent
        }
      ]
    });
  });

  it('should render the component', () => {
    const themeProvider = new MockThemeProviderComponent();
    themeProvider.theme = 'light';

    cy.mount(TestComponent, {
      ...config,
      providers: [
        {
          provide: ThemeProviderComponent,
          useValue: themeProvider
        }
      ]
    });

    cy.get('[data-cy=element]').should('exist');
  });

  it('should not render the component', () => {
    const themeProvider = new MockThemeProviderComponent();
    themeProvider.theme = 'dark';

    cy.mount(TestComponent, {
      ...config,
      providers: [
        {
          provide: ThemeProviderComponent,
          useValue: themeProvider
        }
      ]
    });

    cy.get('[data-cy=element]').should('not.exist');
  });
});
