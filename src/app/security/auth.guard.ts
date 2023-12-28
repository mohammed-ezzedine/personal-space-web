import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

export const authGuard: CanActivateFn = (route, state) => {
  let oauthService = inject(OAuthService)
  if (oauthService.hasValidAccessToken()) {
    return true;
  }

  oauthService.initLoginFlow();
  return false;
};