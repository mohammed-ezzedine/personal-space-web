import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchCategories } from './category/state/category.actions';
import { AuthorizationConfigurerService } from './security/authorization-configurer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private store: Store,
              private authConfigurer: AuthorizationConfigurerService,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.store.dispatch(fetchCategories());
    if (isPlatformBrowser(this.platformId)) {
      this.authConfigurer.configure();
    }
  }
}
