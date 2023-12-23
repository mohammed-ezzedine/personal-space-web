import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, Subject, concatMap, flatMap, forkJoin, map, switchMap, takeUntil } from 'rxjs';
import { Article } from 'src/app/article/article';
import { ArticleService } from 'src/app/article/article-service';
import { ArticleSummary } from 'src/app/article/article-summary';
import { CategoryService } from 'src/app/category/category.service';

@Component({
  selector: 'app-admin-articles-summary',
  templateUrl: './admin-articles-summary.component.html',
  styleUrl: './admin-articles-summary.component.scss'
})
export class AdminArticlesSummaryComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject();

  articles: ArticleSummary[] = [];
  loading: boolean = false;
  categoriesSummary: Map<any, string> = new Map();

  constructor(private articleService: ArticleService,
              private messageService: MessageService,
              private categoryService: CategoryService,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loading = true;
      this.articleService.getArticlesSummary().pipe(
        takeUntil(this.destroy$),
        map(articles => {
          this.articles = articles;
          return Array.from(new Set(articles.map(a => a.categoryId)))
        }),
        concatMap(categoryIds => {
          let categoryDetailsObservables = categoryIds.map(id => this.categoryService.getCategoryDetails(id))
          return forkJoin(categoryDetailsObservables)
        })
      ).subscribe({
        next: categories => {
          this.loading = false;
          categories.forEach(category => this.categoriesSummary.set(category.id, category.name))
        },
        error: error => {
          console.log("Failed to fetch the list of articles", error)
          this.messageService.add({ severity: 'error', summary: "Error", detail: "Failed to fetch the list of articles" })
          this.loading = false;
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({})
    this.destroy$.complete();
  }
}
