import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ArticleSummary } from 'src/app/article/article';
import { ArticleService } from 'src/app/article/article-service';

@Component({
  selector: 'app-highlighted-articles',
  templateUrl: './highlighted-articles.component.html',
  styleUrl: './highlighted-articles.component.scss'
})
export class HighlightedArticlesComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  private readonly SERVER_DATA_KEY = makeStateKey<ArticleSummary[]>("highlightedArticles")

  articles: ArticleSummary[] = [];
  loading = false;

  constructor(private articleService: ArticleService,
              private messageService: MessageService,
              private transferState: TransferState,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.transferState.hasKey(this.SERVER_DATA_KEY)) {
        this.articles = this.transferState.get<ArticleSummary[]>(this.SERVER_DATA_KEY, []);
        this.transferState.remove(this.SERVER_DATA_KEY);
      }
    }

    this.loading = true;
    this.articleService.getHighlightedArticles()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: data => {
          this.articles = data;
          this.loading = false;

          if (isPlatformServer(this.platformId)) {
            this.transferState.set(this.SERVER_DATA_KEY, this.articles);
          }
        },
        error: error => {
          console.error("Failed to fetch the list of highlighted articles", error)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch the list of highlighted articles'})
          this.loading = false;
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next({})
    this.destroy$.complete()
  }
}
