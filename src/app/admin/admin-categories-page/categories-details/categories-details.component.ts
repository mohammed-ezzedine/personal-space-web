import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TableRowReorderEvent } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/category/category';
import { CategoryOrder } from 'src/app/category/category-order';
import { CategoryService } from 'src/app/category/category.service';

@Component({
  selector: 'app-categories-details',
  templateUrl: './categories-details.component.html',
  styleUrls: ['./categories-details.component.scss']
})
export class CategoriesDetailsComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject();

  readonly categoryNameValidator: RegExp = /^[a-zA-Z ]+$/

  categorySummaries: Category[] = [];

  categoryCandidateNameInput = new FormControl('', [ Validators.required, Validators.pattern(this.categoryNameValidator)]);

  categoryCreationLoading: boolean = false;
  fetchingCategoriesLoading: boolean = false;

  constructor(private categoryService: CategoryService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.fetchingCategoriesLoading = true;
    this.categoryService.getCategorySummaries()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: categorySummaries => {
          this.categorySummaries = categorySummaries,
          this.fetchingCategoriesLoading = false;
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

  updateCategoriesOrder(event: TableRowReorderEvent) {
    if (event.dragIndex == event.dropIndex) {
      return;
    }

    this.categorySummaries.forEach(c => {
      const categoryIndex = c.order - 1;
      const categoryWasAfterTheTargetAndBecameBeforeIt = categoryIndex > event.dragIndex! && categoryIndex <= event.dropIndex!;
      const categoryIdTheTarget = categoryIndex == event.dragIndex;
      const categoryWasBeforeTheTargetAndBecameAfterIt = categoryIndex < event.dragIndex! && categoryIndex >= event.dropIndex!;
      if (categoryWasAfterTheTargetAndBecameBeforeIt ) {
        c.order--;
      } else if (categoryIdTheTarget) {
        c.order = event.dropIndex! + 1;
      } else if (categoryWasBeforeTheTargetAndBecameAfterIt) {
        c.order++;
      }
    })

    this.categoryService.updateCategoriesOrder(this.categorySummaries.map(c => <CategoryOrder>{ categoryId: c.id, categoryOrder: c.order }))
    .subscribe({
      next: () => this.showSuccessMessage("Categories orders is updated"),
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
        .subscribe({
          next: result => {
            this.categorySummaries.push({
              id: result.id,
              name: this.categoryCandidateNameInput.value!,
              order: result.order,
              canBeDeleted: true
            })
            this.showSuccessMessage("Category is created.")
            this.categoryCreationLoading = false;
            this.categoryCandidateNameInput.setValue('')
          },
          error: e => {
            this.categoryCreationLoading = false;
            this.showErrorMessage("Failed to create the new category")
          }
        })
    }
  }
}
