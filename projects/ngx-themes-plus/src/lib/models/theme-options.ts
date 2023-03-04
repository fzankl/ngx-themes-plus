export class ThemeOptions {
  /**
   * Key used to store theme setting in localStorage
   */
  public storageKey = 'theme';

  /**
   * Whether to switch between dark and light based on prefers-color-scheme
   */
  public enableSystem = true;

  /**
   * Whether to indicate to browsers which color scheme is used (dark or light)
   * for built-in UI like inputs and buttons
   */
  public enableColorScheme = true;

  /**
   * HTML attribute modified based on the active theme accepts class and data-*
   */
  public attribute = 'data-theme';

  /**
   * List of themes
   */
  public themes: string[] = ['light', 'dark'];

  /**
   * Default theme name.
   * If enableSystem is false, the default theme is light
   */
  public defaultTheme: string = this.enableSystem ? 'system' : 'light';
}
