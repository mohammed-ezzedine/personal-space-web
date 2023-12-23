import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, concatMap, takeUntil } from 'rxjs';
import { SeoService } from 'src/app/services/seo/seo.service';
import { Article } from '../article';
import { ArticleService } from '../article-service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject();
  private readonly SERVER_DATA_KEY = makeStateKey<Article>("articleData")

  articleId: string | undefined;
  article: Article | undefined;

  loadingFetchingArticle: boolean = false;

  constructor(private route: ActivatedRoute, 
    private articleService: ArticleService, 
    private messageService : MessageService,
    private seoService: SeoService,
    private transferState: TransferState,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.fetchArticleDetails();
  }

  private fetchArticleDetails() : void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.transferState.hasKey(this.SERVER_DATA_KEY)) {
        this.readArticleFromServerData();
        return;
      }
    }

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

          this.storeArticleInServerData();
        },
        error: (error: HttpErrorResponse) => {
          console.error(`failed to fetch the article with ID ${this.articleId}`, error)
          this.loadingFetchingArticle = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch article details.'})
        }
      })
  }

  go() {
    this.router.navigate(['articles', '60c96392-1347-474e-9c59-1952091f5672'])
  }

  private readArticleFromServerData() {
    this.article = this.transferState.get<Article | undefined>(this.SERVER_DATA_KEY, undefined)
    this.transferState.remove(this.SERVER_DATA_KEY);
  }

  private storeArticleInServerData() {
    if (isPlatformServer(this.platformId)) {
      this.transferState.set(this.SERVER_DATA_KEY, this.article);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({})
    this.destroy$.complete()
  }
}
