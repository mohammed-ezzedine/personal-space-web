import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { AuthorizationConfigurerService } from './security/authorization-configurer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private authConfigurer: AuthorizationConfigurerService,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.authConfigurer.configure();
    }
  }
}
