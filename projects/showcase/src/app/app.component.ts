import { Component } from '@angular/core';
import { ThemeOptions } from 'ngx-themes-plus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public options: ThemeOptions;

  public forcedTheme: string | undefined = '';

  constructor() {
    const options = new ThemeOptions();
    options.defaultTheme = 'light';

    this.options = options;
  }
}
