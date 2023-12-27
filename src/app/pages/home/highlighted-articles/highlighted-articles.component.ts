import { Component, OnDestroy, OnInit } from '@angular/core';
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

  articles: ArticleSummary[] = [];
  loading = false;

  constructor(private articleService: ArticleService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.loading = true;
    this.articleService.getHighlightedArticles()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: data => {
          this.articles = data;
          this.loading = false;
        },
        error: error => {
          console.error("Failed to fetch the list of highlighted articles", error)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch the list of highlighted articles'})
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next({})
    this.destroy$.complete()
  }
}
