import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { Subject, takeUntil } from 'rxjs';
import { ArticleSummary } from 'src/app/article/article';
import { ArticleService } from 'src/app/article/article-service';

@Component({
  selector: 'app-latest-articles',
  templateUrl: './latest-articles.component.html',
  styleUrl: './latest-articles.component.scss'
})
export class LatestArticlesComponent implements OnInit, OnDestroy{

  private readonly destroy$ = new Subject();
  private readonly SERVER_ARTICLES_DATA_KEY = makeStateKey<ArticleSummary[]>("latestArticlesSummary")
  private readonly SERVER_ARTICLES_NUMBER_DATA_KEY = makeStateKey<number>("totalNumberOfLatestArticlesSummary")

  loading = false;
  articles: ArticleSummary[] = [];
  pageIndex: number = 0;
  totalNumberOfArticles: number = 0;
  readonly pageSize: number = 10;

  constructor(private articleService: ArticleService,
              private messageService: MessageService,
              private transferState: TransferState,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.transferState.hasKey(this.SERVER_ARTICLES_DATA_KEY)) {
        this.articles = this.transferState.get<ArticleSummary[]>(this.SERVER_ARTICLES_DATA_KEY, []);
        this.transferState.remove(this.SERVER_ARTICLES_DATA_KEY);

        if (this.transferState.hasKey(this.SERVER_ARTICLES_NUMBER_DATA_KEY)) {
          this.totalNumberOfArticles = this.transferState.get<number>(this.SERVER_ARTICLES_NUMBER_DATA_KEY, 0);
          this.transferState.remove(this.SERVER_ARTICLES_NUMBER_DATA_KEY);
          return;
        }
      }
    }

    this.fetchArticles();
  }

  private fetchArticles() {
    this.loading = true;
    this.articleService.getArticlesSummary2({
      'page': this.pageIndex,
      'size': this.pageSize,
      'sortBy': 'createdDate',
      'ascOrder': false,
      'highlighted': false
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => {
          this.articles = data.items;
          this.totalNumberOfArticles = data.totalSize;
          this.loading = false;

          if (isPlatformServer(this.platformId)) {
            this.transferState.set(this.SERVER_ARTICLES_DATA_KEY, this.articles);
            this.transferState.set(this.SERVER_ARTICLES_NUMBER_DATA_KEY, this.totalNumberOfArticles);
          }
        },
        error: error => {
          console.error("Failed to fetch the list of articles", error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch the list of articles' });
          this.loading = false;
        }
      });
  }

  onPageChange($event: PaginatorState) {
    if($event.page === this.pageIndex) {
      return;
    }

    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
    this.pageIndex = $event.page!;

    this.fetchArticles();
  }

  ngOnDestroy(): void {
    this.destroy$.next({})
    this.destroy$.complete();
  }

}
