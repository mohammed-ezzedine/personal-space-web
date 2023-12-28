import { Injectable } from '@angular/core';
import { NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationConfigurerService {

  constructor(private oauthService: OAuthService) { }

  configure() {
    this.oauthService.configure({
      issuer: environment.auth.issuerUrl,
      redirectUri: window.location.origin,
      clientId: environment.auth.clientId,
      scope: environment.auth.scope,
      responseType: environment.auth.grantType,
      disableAtHashCheck: true,
      showDebugInformation: true,
    })
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
