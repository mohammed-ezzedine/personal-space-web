import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { Store } from '@ngrx/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/category/category';
import { categories } from 'src/app/category/state/category.selectors';
import { AppState } from 'src/app/state/app.state';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, ButtonModule, CommonModule, ThemeToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject();
  private readonly SERVER_CATEGORIES_DATA_KEY = makeStateKey<Category[]>("navbarCategories")

  isAdmin = false;
  items: MenuItem[] | undefined;

  constructor(private store: Store<AppState>,
              private oauthService: OAuthService,
              private transferState: TransferState,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isAdmin = this.oauthService.hasValidAccessToken();

      if (this.transferState.hasKey(this.SERVER_CATEGORIES_DATA_KEY)) {
        let categories = this.transferState.get<Category[]>(this.SERVER_CATEGORIES_DATA_KEY, []);
        this.transferState.remove(this.SERVER_CATEGORIES_DATA_KEY);
        this.initializeItems(categories);
        return;
      }
    }

    this.store.select(categories)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: categories => {
          if (isPlatformServer(this.platformId)) {
            this.transferState.set(this.SERVER_CATEGORIES_DATA_KEY, categories);
          }
          this.initializeItems(categories);
        }
      })
    
  }

  private initializeItems(categories: Category[]) {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'Categories',
        icon: 'pi pi-tags',
        items: categories.map(c => {
          return { 
            label: c.name,
            routerLink: 'articles/category/' + c.id
          }
        })
      },
      {
        label: 'Admin',
        icon: 'pi pi-lock',
        visible: this.isAdmin,
        items: [
          {
            label: 'Manage Articles',
            routerLink: '/admin/articles'
          },
          {
            label: 'Manage Categories',
            routerLink: '/admin/categories'
          }
        ]
      }
    ];
  }

  ngOnDestroy(): void {
    this.destroy$.next({})
    this.destroy$.complete()
  }

  logout() {
    this.oauthService.logOut();
  }
}
