import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ArticleSummary } from 'src/app/article/article';
import { ArticleService } from 'src/app/article/article-service';
import { ArticleHighlightSummary } from 'src/app/article/article-highlight-summary';

@Component({
  selector: 'app-admin-highlighted-articles-page',
  templateUrl: './admin-highlighted-articles-page.component.html',
  styleUrl: './admin-highlighted-articles-page.component.scss'
})
export class AdminHighlightedArticlesPageComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject();

  articles: ArticleSummary[] = [];
  loading = false;

  constructor(private articleService: ArticleService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.loading = true;
    this.articleService.getHighlightedArticles()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: articles => {
        this.articles = articles.items;
        this.loading = false;
      },
      error: error => {
        console.error("Failed to fetch the highlighted articles", error)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch the highlighted articles'})
        this.loading = false;
      }
    })
  }
  
  ngOnDestroy(): void {
    this.destroy$.next({})
    this.destroy$.complete()
  }

  reorderHighlights(): void {
    let order = this.articles.map((article, index) => {
      return { articleId: article.id, rank: index + 1} as ArticleHighlightSummary
    })
    this.loading = true;
    this.articleService.updateArticlesHighlights(order)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Articles highlight is successfully updated'})
          this.loading = false;
        },
        error: error => {
          console.error("Failed to update articles highlight", error)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update articles highlight'})
          this.loading = false;
        }
      })

  }

  remove(articleId: string) {
    this.articles = this.articles.filter(a => a.id !== articleId);
    this.reorderHighlights();
  }

}
