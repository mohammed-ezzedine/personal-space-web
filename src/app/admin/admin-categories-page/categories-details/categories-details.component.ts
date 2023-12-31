import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { TableRowReorderEvent } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/category/category';
import { CategoryOrder } from 'src/app/category/category-order';
import { CategoryService } from 'src/app/category/category.service';
import { fetchCategories } from 'src/app/category/state/category.actions';
import { categories } from 'src/app/category/state/category.selectors';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-categories-details',
  templateUrl: './categories-details.component.html',
  styleUrls: ['./categories-details.component.scss']
})
export class CategoriesDetailsComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject();

  private readonly SERVER_DATA_KEY = makeStateKey<Category[]>("categoriesData");

  readonly categoryNameValidator: RegExp = /^[a-zA-Z ]+$/

  categorySummaries: Category[] = [];

  categoryCandidateNameInput = new FormControl('', [ Validators.required, Validators.pattern(this.categoryNameValidator)]);

  categoryCreationLoading: boolean = false;
  fetchingCategoriesLoading: boolean = false;

  constructor(private store: Store<AppState>,
              private categoryService: CategoryService,
              private messageService: MessageService,
              private transferState: TransferState,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.transferState.hasKey(this.SERVER_DATA_KEY)) {
        this.categorySummaries = this.transferState.get<Category[]>(this.SERVER_DATA_KEY, []);
        this.transferState.remove(this.SERVER_DATA_KEY);
        return;
      }
    }

    this.fetchingCategoriesLoading = true;
    this.store.select(categories)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: categorySummaries => {
          this.categorySummaries = categorySummaries,
          this.fetchingCategoriesLoading = false;

          if (isPlatformServer(this.platformId)) {
            this.transferState.set(this.SERVER_DATA_KEY, categorySummaries);
          }
        },
        error: () => {
          this.showErrorMessage("Failed to fetch the categories details.")
          this.fetchingCategoriesLoading = false;
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  reorderCategories(event: any) {
    for (let i = 0; i < this.categorySummaries.length; i++) {
      this.categorySummaries[i].order = i + 1;
    }
    this.categoryService.updateCategoriesOrder(this.categorySummaries.map(c => <CategoryOrder>{ categoryId: c.id, categoryOrder: c.order }))
    .subscribe({
      next: () => {
        this.showSuccessMessage("Categories orders is updated")
        this.store.dispatch(fetchCategories())
      },
      error: e => this.showErrorMessage("Failed to update the categories orders")
    })
  }

  private showSuccessMessage(message: string): void {
    return this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  private showErrorMessage(message: string): void {
    return this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  createNewCategory() {
    if (this.categoryCandidateNameInput.valid) {
      this.categoryCreationLoading = true;
      this.categoryService.createNewCategory(this.categoryCandidateNameInput.value!)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: result => {
            this.showSuccessMessage("Category is created.")
            this.categoryCreationLoading = false;
            this.categoryCandidateNameInput.setValue('')
            this.store.dispatch(fetchCategories())
          },
          error: e => {
            this.categoryCreationLoading = false;
            this.showErrorMessage("Failed to create the new category")
          }
        })
    }
  }

  deleteCategory(id: string) {
    console.log("deleting", id)
    this.categoryService.deleteCategory(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.showSuccessMessage(`Category ${id} was successfully deleted`);
          this.store.dispatch(fetchCategories())
        },
        error: error => {
          console.error("Failed to delete category with ID", id, error);
          this.showErrorMessage(error.error)
        }
      })
  }
}
