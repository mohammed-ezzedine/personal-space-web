import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Theme } from './theme.type';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  switchTheme(theme: Theme) {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement

    if (themeLink) {
      themeLink.href = `${theme}.css`
    }
  }
}
