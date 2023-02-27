<div align="center">
  <img src="./assets/logo_dark.svg#gh-dark-mode-only" alt="ngx-themes-plus logo" title="ngx-themes-plus" style="max-height: 175px;" />
  <img src="./assets/logo_light.svg#gh-light-mode-only" alt="ngx-themes-plus logo" title="ngx-themes-plus" style="max-height: 175px;" />
  <p>Perfect Angular theme support in two lines of code.<br/>Support system preferences and any other themes. Integrated theme switcher.</p>
</div>

<div align="center">

[![Build Status](https://github.com/fzankl/ngx-themes-plus/actions/workflows/main.yml/badge.svg)](https://github.com/fzankl/ngx-themes-plus)
![Version](https://img.shields.io/npm/v/ngx-themes-plus.svg?colorB=green)
[![npm Downloads](https://img.shields.io/npm/dt/ngx-themes-plus.svg)](https://www.npmjs.com/package/ngx-themes-plus)

**⭐ Star the project on GitHub — it motivates a lot!**
</div>

## Features

- ✅ Perfect theme/dark mode support in two lines of code
- ✅ Support for additional customized themes
- ✅ System setting with prefers-color-scheme
- ✅ Themed browser UI with color-scheme
- ✅ Integrated theme switcher (considers custom themes as well)
- ✅ Sync theme across tabs and windows
- ✅ Force pages to specific themes
- ✅ Class or data attribute selector
- ✅ Toggle element visibility based on a selected theme

Check out the [Live Example](https://fzankl.github.io/ngx-themes-plus/) to try it for yourself.

## Install

```bash
$ npm install ngx-themes-plus
```

## Use

You have to add the module to the root module definition. The simplest `AppModule` looks like this:

```js
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ThemesModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Adding theme support takes 2 lines of code:

```html
<tp-theme-provider>
  <router-outlet></router-outlet>
</tp-theme-provider>
```

That's it, your Angular app fully supports themes, including System preference with `prefers-color-scheme`. The theme is also immediately synced between tabs. By default, ngx-themes-plus modifies the `data-theme` attribute on the `html` element, which you can easily use to style your app:

```css
:root {
  /* Your default theme */
  --background: #FFF;
  --foreground: #000;
}

[data-theme='dark'] {
  --background: #000;
  --foreground: #FFF;
}
```

### Switch themes

ngx-themes-plus supports switching themes using the integrated `theme-switcher` component. You can use it as easily as the parent component with an additional line of code.

![Integrated theme switcher](https://user-images.githubusercontent.com/44210522/221420926-d86537a6-7428-4f42-a407-4455135b0102.png#gh-light-mode-only)
![Integrated theme switcher](https://user-images.githubusercontent.com/44210522/221420928-f29c8b48-eddd-4d03-9742-31f424a5eb31.png#gh-dark-mode-only)

When using the two default themes `light` and `dark` the `theme-switcher` uses some default icons. The following snippet shows the simplest implementation when using the default themes:

```html
<tp-theme-provider>
  <tp-theme-switcher></tp-theme-switcher>
</tp-theme-provider>
```

When your application requires additional colors you can extend the themes via the options during bootstrapping.

```js
const options = new ThemeOptions();
options.themes = [...options.themes, 'yellow'];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ThemesModule.forRoot(options)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

For the theme to be displayed correctly, the styles need to be extended. 
**Take care about adding the color definition `--theme` for each theme since that color is used by the `theme-switcher` to render its selection.**

```css
:root {
  /* Your default theme */
  --background: #FFF;
  --foreground: #000;
}

[data-theme="light"] {
  --theme: #f6f4e6;
}

[data-theme="dark"] {
  --theme: #27272A;

  --background: #27272A;
  --foreground: #f6f4e6;
}

[data-theme="yellow"] {
  --theme: #FACC15;

  --background: #E4E4E7;
  --foreground: #18181B;
}
```

### Force theme

A forced theme is the right option if you like to present a page using a specific theme only. Switching themes does not have an effect.

To force a theme on your Angular pages, simply inject the `ThemeProviderComponent` via the constructor and set the theme you like. Integrated `theme-switcher` is disabled in this case.

```js
@Component({
  selector: 'app-page-forced'
})
export class ForcedPageComponent implements OnDestroy {
  constructor(private readonly themeProvider: ThemeProviderComponent) {
    this.themeProvider.forcedTheme = 'dark';
  }

  public ngOnDestroy(): void {
    this.themeProvider.forcedTheme = '';
  }
}
```

A second possibility is to set the value of the property `forcedTheme` via template binding.

```html
<tp-theme-provider [forcedTheme]="forcedTheme">
  <!-- Content -->
</tp-theme-provider>
```

```js
/*
 * The way how you enforce a specific theme depends upon 
 * the possibilities of your application.
 * The `AppConfigService` is just a kind of placeholder 
 * for any application specific logic. 
 */
@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private _forcedTheme$ = new BehaviorSubject<string | undefined>(undefined);
  public forcedTheme$ = this._forcedTheme$.asObservable();

  public forceTheme(theme?: string): void {
    this._forcedTheme$.next(theme);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public forcedTheme: string | undefined;

  constructor(private readonly appConfigService: AppConfigService) {
    // Set the forced theme using any application specific logic.
    this.appConfigService.forcedTheme$.subscribe({
      next: (theme) => this.forcedTheme = theme
    });
  }
}

@Component({
  selector: 'app-page-forced'
})
export class ForcedPageComponent implements OnDestroy {
  constructor(private readonly appConfigService: AppConfigService) {
    this.appConfigService.forceTheme('dark');
  }

  public ngOnDestroy(): void {
    this.appConfigService.forceTheme();
  }
}
```

### Theme-specific elements

It may be possible to show or hide elements depending on the selected theme, e.g. a specific logo. The library exposes the directives `tpThemesOnly` and `tpThemesExcept` that can show/hide elements of your application based on the selected theme.

The directive accepts several attributes:

| Attribute               | Value                   | Description|
| :---------------------- | :---------------------- | :---------------------- |
| `tpThemesOnly` | `[String \| String[]]` | Single or multiple themes for which the associated element should be shown |
| `tpThemesExcept` | `[String \| String[]]` | Single or multiple themes for which the associated element should not be shown |

The logo within the showcase is changed using both directives shown in the following snippet:

```html
<div class="logo">
  <img *tpThemesOnly="'dark'" src="path-to-the-image" />
  <img *tpThemesExcept="'dark'" src="path-to-the-image" />
</div>
```

## Troubleshooting

If theme support does not work as expected, check that your application configuration is valid according to this documentation. If that doesn't help, please feel free to open an issue.

## Changelog

02/28/2023
  * Initial release.
