import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { SERVER_URL } from './tokens';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [
    { provide: SERVER_URL, useValue: 'http://localhost:8080' }
    // { provide: SERVER_URL, useValue: 'http://personal-space-api:8080' }
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
