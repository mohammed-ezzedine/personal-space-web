import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/category/category';
import { CategoryService } from 'src/app/category/category.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject();

  items: MenuItem[] | undefined;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategorySummaries()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: categories => {
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
            label: c.name
          }
        })
      },
      {
        label: 'Admin',
        icon: 'pi pi-lock',
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
}
