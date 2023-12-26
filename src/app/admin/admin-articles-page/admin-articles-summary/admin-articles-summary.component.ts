import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { Observable, Subject, concatMap, filter, flatMap, forkJoin, map, merge, mergeMap, switchMap, take, takeUntil } from 'rxjs';
import { Article, HighlightedArticleSummary } from 'src/app/article/article';
import { ArticleService } from 'src/app/article/article-service';
import { CategoryService } from 'src/app/category/category.service';

@Component({
  selector: 'app-admin-articles-summary',
  templateUrl: './admin-articles-summary.component.html',
  styleUrl: './admin-articles-summary.component.scss'
})
export class AdminArticlesSummaryComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();

  articles: HighlightedArticleSummary[] = [];
  loading: boolean = false;
  categoriesSummary: Map<any, string> = new Map();
  highlightedArticles: string[] = [];
  pageIndex: number = 0;
  numberOfArticles: number = 0;
  readonly pageSize: number = 10;

  constructor(private articleService: ArticleService,
              private messageService: MessageService,
              private categoryService: CategoryService,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loading = true;
      this.fetchArticles();
    }
  }

  private fetchArticles() {
    this.articleService.getArticlesSummary(this.pageIndex, this.pageSize, "createdDate", false).pipe(
      takeUntil(this.destroy$),
      concatMap(articles => {
        this.numberOfArticles = articles.totalSize;
        return this.articleService.getArticleHighlightsSummary()
          .pipe(
            takeUntil(this.destroy$),
            map(highlights => articles.items.map(a => {
                return {...a, highlighted: highlights.map(h => h.articleId).includes(a.id) } as HighlightedArticleSummary
              })
            )
          )
      }),
      map(articles => {
        this.articles = articles;
        return this.articles.map(a => a.categoryId);
      }),
      map(categoryIds => Array.from(new Set(categoryIds))),
      map(categoryIds => categoryIds.filter(id => !this.categoriesSummary.has(id))),
      concatMap(categoryIds => {
        let categoryDetailsObservables = categoryIds.map(id => this.categoryService.getCategoryDetails(id));
        return forkJoin(categoryDetailsObservables);
      })
    ).subscribe({
      next: categories => {
        this.loading = false;
        categories.forEach(category => this.categoriesSummary.set(category.id, category.name));
      },
      error: error => {
        console.log("Failed to fetch the list of articles", error);
        this.messageService.add({ severity: 'error', summary: "Error", detail: "Failed to fetch the list of articles" });
        this.loading = false;
      }
    });
  }

  onPageChange($event: PaginatorState) {
    if($event.page === this.pageIndex) {
      return;
    }

    this.pageIndex = $event.page!;

    this.fetchArticles();
  }

  ngOnDestroy(): void {
    this.destroy$.next({})
    this.destroy$.complete();
  }

  handleArticleVisibilityChange(articleId: string, visibility: boolean) {
    this.articleService.editArticle(articleId, { hidden: visibility })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.articles.filter(a => a.id === articleId)[0].hidden = visibility;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Article visibility updated.'})
        },
        error: error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to updated article visibility.'})
          console.error("Failed to update the visibility of article {}", articleId, error);
        }
      })
  }

  handleArticleHighlightChange(articleId: string, highlight: boolean) {
    let observable = highlight ? this.articleService.addArticleToHighlight(articleId) : this.articleService.removeArticleFromHighlight(articleId)
    observable.pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => {
        this.articles.filter(a => a.id === articleId)[0].highlighted = highlight;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Article highlight updated.'})
      },
      error: error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to updated article highlight.'})
          console.error("Failed to update the highlight of article {}", articleId, error);
      }
    })
  }
  
}
