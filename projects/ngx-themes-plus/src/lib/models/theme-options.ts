export class ThemeOptions {
  /**
   * Key used to store theme setting in localStorage
   */
  public storageKey: string = 'theme';

  /**
   * Whether to switch between dark and light based on prefers-color-scheme
   */
  public enableSystem: boolean = true;

  /**
   * Whether to indicate to browsers which color scheme is used (dark or light)
   * for built-in UI like inputs and buttons
   */
  public enableColorScheme = true;

  /**
   * HTML attribute modified based on the active theme
   * accepts class and data-* (meaning any data attribute, data-mode, data-color, etc.)
   */
  public attribute = 'data-theme';

  /**
   * List of theme names
   */
  public themes: string[] = ['light', 'dark'];

  /**
   * Default theme name.
   * If enableSystem is false, the default theme is light
   */
  public defaultTheme: string = this.enableSystem ? 'system' : 'light';
}
