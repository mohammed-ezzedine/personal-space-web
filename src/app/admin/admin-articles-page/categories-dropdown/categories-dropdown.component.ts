import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/category/category';
import { CategoryService } from 'src/app/category/category.service';

@Component({
  selector: 'app-categories-dropdown',
  templateUrl: './categories-dropdown.component.html',
  styleUrls: ['./categories-dropdown.component.scss']
})
export class CategoriesDropdownComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject();

  constructor(private categoryService: CategoryService,
              private messageService: MessageService) { }
  
  categoriesSummaries: Category[] = [];
  loadingCategories: boolean = false;

  @Input()
  form!: FormGroup;

  ngOnInit(): void {
    this.loadingCategories = true;
    this.categoryService.getCategorySummaries()
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
