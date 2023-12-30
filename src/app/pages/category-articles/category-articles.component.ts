import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, concatMap, takeUntil } from 'rxjs';
import { ArticleSummary } from 'src/app/article/article';
import { ArticleService } from 'src/app/article/article-service';
import { Category } from 'src/app/category/category';
import { CategoryService } from 'src/app/category/category.service';
import { SeoService } from 'src/app/services/seo/seo.service';

@Component({
  selector: 'app-category-articles',
  templateUrl: './category-articles.component.html',
  styleUrl: './category-articles.component.scss'
})
export class CategoryArticlesComponent implements OnInit, OnDestroy {

  private readonly SERVER_ARTICLES_DATA_KEY = makeStateKey<ArticleSummary[]>("categoryArticles")
  private readonly SERVER_ARTICLES_TOTAL_NUMBER_DATA_KEY = makeStateKey<number>("categoryArticlesTotalNumber")

  private readonly destroy$ = new Subject()

  private categoryId?: string;

  category?: Category;
  pageIndex = 0;
  pageSize = 10;
  totalRecords = 0;
  loading = false;

  articles: ArticleSummary[] = [];

  constructor(private route: ActivatedRoute,
              private articleService: ArticleService,
              private messageService: MessageService,
              private categoryService: CategoryService,
              private router: Router,
              private seoService: SeoService,
              private transferState: TransferState,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.route.params
    .pipe(
      takeUntil(this.destroy$),
      concatMap(params => {
        this.categoryId = params["categoryId"]
        return this.categoryService.getCategoryDetails(this.categoryId!);
      })
    )
    .subscribe({
      next: data => {
        this.category = data;
        this.seoService.setMetadata({
          title: data.name,
          description: `${data.name} Articles`
        })
        this.fetchArticlesSummary();
      },
      error: error => {
        if (error.status == 404) {
          this.router.navigateByUrl('not-found')
          return;
        }
      }
    })
  }
  
  ngOnDestroy(): void {
    this.destroy$.next({})
    this.destroy$.complete();
  }

  onPageChange(event) {
    this.pageIndex = event.page!;
    this.fetchArticlesSummary();
  }

  fetchArticlesSummary() {
    if (this.categoryId) {
      if (isPlatformBrowser(this.platformId)) {
        if (this.transferState.hasKey(this.SERVER_ARTICLES_DATA_KEY)) {
          this.articles = this.transferState.get<ArticleSummary[]>(this.SERVER_ARTICLES_DATA_KEY, [])
          this.transferState.remove(this.SERVER_ARTICLES_DATA_KEY);

          if (this.transferState.hasKey(this.SERVER_ARTICLES_TOTAL_NUMBER_DATA_KEY)) {
            this.totalRecords = this.transferState.get<number>(this.SERVER_ARTICLES_TOTAL_NUMBER_DATA_KEY, 0)
            this.transferState.remove(this.SERVER_ARTICLES_TOTAL_NUMBER_DATA_KEY);
            return;
          }
        }
      }

      this.loading = true;
      this.articleService.getArticlesSummary({ 
        "page": this.pageIndex, 
        "size": this.pageSize, 
        "categoryId": this.categoryId,
        "sortBy": "createdDate",
        "ascOrder": false
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => {
          this.totalRecords = data.totalSize
          this.articles = data.items
          this.loading = false;

          if (isPlatformServer(this.platformId)) {
            this.transferState.set(this.SERVER_ARTICLES_DATA_KEY, this.articles);
            this.transferState.set(this.SERVER_ARTICLES_TOTAL_NUMBER_DATA_KEY, this.totalRecords);
          }
        },
        error: error => {
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch articles'})
          console.error("Failed to fetch articles", error)
        }
      })
    }
    
  }

}
