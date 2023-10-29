import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, concatMap, map, takeUntil } from 'rxjs';
import { ArticleService } from '../article-service';
import { Article } from '../article';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject();

  articleId: string | undefined;
  article: Article | undefined;

  loadingFetchingArticle: boolean = false;

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private messageService : MessageService) { }

  ngOnInit(): void {
    this.loadingFetchingArticle = true;
    this.route.params.pipe(
      takeUntil(this.destroy$),
      concatMap(params => {
        this.articleId = params["articleId"]

        return this.articleService.getArticle(this.articleId!)
      })
      )
      .subscribe({
        next: article => {
          this.article = article;
          this.loadingFetchingArticle = false;
        },
        error: () => {
          this.loadingFetchingArticle = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch article details.'})
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next({})
    this.destroy$.complete()
  }
}
