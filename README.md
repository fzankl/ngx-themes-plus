# ngx-themes-plus

[![Build Status](https://github.com/fzankl/ngx-themes-plus/actions/workflows/main.yml/badge.svg)](https://github.com/fzankl/ngx-themes-plus)
![Version](https://img.shields.io/npm/v/ngx-themes-plus.svg?colorB=green)
[![npm Downloads](https://img.shields.io/npm/dt/ngx-themes-plus.svg)](https://www.npmjs.com/package/ngx-themes-plus)

Theme support in your Angular app.

- ✅ Perfect dark mode in 2 lines of code
- ✅ Support for additional customized themes
- ✅ System setting with prefers-color-scheme
- ✅ Themed browser UI with color-scheme
- ✅ Integrated theme switcher (considers custom themes as well)
- ✅ Sync theme across tabs and windows
- ✅ Force pages to specific themes
- ✅ Class or data attribute selector

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
<theme-provider>
  <router-outlet></router-outlet>
</theme-provider>
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

ngx-themes-plus supports switching themes using the integrated `theme-switcher` component. You can use it as easy as the parent component with an additional line of code. The following snippet shows the simplest implementation:

```html
<theme-provider>
  <theme-switcher></theme-switcher>
</theme-provider>
```

### Force theme

Forced theme is the right option if you like to present a page using a specific theme only. Switching themes does not have an effect.

To force a theme on your Angular pages, simply inject the `ThemeProviderComponent` via the constructor an set the theme you like. Integrated `theme-switcher` is disabled in this case.

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
