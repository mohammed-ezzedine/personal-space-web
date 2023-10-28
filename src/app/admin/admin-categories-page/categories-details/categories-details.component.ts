import { Component, OnDestroy, OnInit } from '@angular/core';
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

  categorySummaries: Category[] = [];

  constructor(private categoryService: CategoryService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.categoryService.getCategorySummaries()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: categorySummaries => this.categorySummaries = categorySummaries,
        error: error => console.error(error)
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
      next: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: "categories orders is updated"}),
      error: e => console.error("failed to update the categories orders", e)
    })
  }
}
