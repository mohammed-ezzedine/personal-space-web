import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, concatMap, takeUntil } from 'rxjs';
import { SeoService } from 'src/app/services/seo/seo.service';
import { Article } from '../article';
import { ArticleService } from '../article-service';

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

  constructor(private route: ActivatedRoute, 
    private articleService: ArticleService, 
    private messageService : MessageService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

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
            this.seoService.setMetadata({ title: article.title, description: article.description })
          },
          error: (error: HttpErrorResponse) => {
            console.error(`failed to fetch the article with ID ${this.articleId}`, error)
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
