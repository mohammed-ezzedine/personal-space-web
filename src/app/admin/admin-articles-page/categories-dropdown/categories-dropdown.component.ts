import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/category/category';
import { categories } from 'src/app/category/state/category.selectors';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-categories-dropdown',
  templateUrl: './categories-dropdown.component.html',
  styleUrls: ['./categories-dropdown.component.scss']
})
export class CategoriesDropdownComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject();

  constructor(private store: Store<AppState>,
              private messageService: MessageService) { }
  
  categoriesSummaries: Category[] = [];
  loadingCategories: boolean = false;

  @Input()
  form!: FormGroup;

  ngOnInit(): void {
    this.loadingCategories = true;
    this.store.select(categories)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: categories => {
          this.categoriesSummaries = categories;
          this.loadingCategories = false;
        },
        error: () => {
          this.loadingCategories = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch the list of categories.'})
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next({})
    this.destroy$.complete();
  }
}
