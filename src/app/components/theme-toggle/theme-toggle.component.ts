import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from 'src/app/services/themes/theme.service';
import { Theme } from 'src/app/services/themes/theme.type';

const localStorageThemeKey = 'personal-space-theme';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent {


  lightTheme: boolean = true;
  darkTheme: boolean = false;

  private theme: Theme = 'light-theme';

  constructor(private themeService: ThemeService,
              @Inject(PLATFORM_ID) private platformId: Object) { 

    if (isPlatformBrowser(platformId)) {
      let theme = localStorage.getItem(localStorageThemeKey) as Theme
      if (theme) {
        this.theme = theme;
        this.themeService.switchTheme(this.theme);
      } else {
        localStorage.setItem(localStorageThemeKey, this.theme);
      }
    }
  }

  toggleTheme() {
    this.theme = this.theme == 'light-theme' ? 'dark-theme' : 'light-theme';
    this.lightTheme = this.theme == 'light-theme'
    this.darkTheme = this.theme == 'dark-theme'
    this.themeService.switchTheme(this.theme);
    localStorage.setItem(localStorageThemeKey, this.theme);
  }
}
