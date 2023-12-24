import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, concatMap, flatMap, map, mergeMap, switchMap, takeUntil } from 'rxjs';
import { Article } from 'src/app/article/article';
import { ArticleService } from 'src/app/article/article-service';

@Component({
  selector: 'app-admin-edit-article-page',
  templateUrl: './admin-edit-article-page.component.html',
  styleUrl: './admin-edit-article-page.component.scss'
})
export class AdminEditArticlePageComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject();

  loading: boolean = false;

  form: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
    thumbnailImageUrl: [null],
    content: ['', [Validators.required]],
    keywords: [[]],
    hidden: [false, []]
  });

  articleId: string = '';

  constructor(private route: ActivatedRoute,
              private articleService: ArticleService,
              private messageService : MessageService,
              private formBuilder: FormBuilder,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.pipe(
      takeUntil(this.destroy$),
      map(params => params["id"] as string),
      concatMap(articleId => this.articleService.getArticle(articleId))
    ).subscribe({
      next: data => {
        this.articleId = data.id;

        this.form.setValue({
          'title': data.title,
          'description': data.description,
          'categoryId': data.categoryId,
          'thumbnailImageUrl': data.thumbnailImageUrl,
          'content': data.content,
          'keywords': data.keywords,
          'hidden': data.hidden
        })

        this.loading = false;
      },
      error: error => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch article details.'})
        console.error(`failed to fetch article`, error);
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  shouldRenderForm() {
    return isPlatformBrowser(this.platformId) && !this.loading;
  }

  submit() {
    if (this.form.valid) {
      this.loading = true;
      this.articleService.editarticle(this.articleId, this.form.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Article edited successfully'})
            this.router.navigate(['articles', this.articleId])
            this.loading = false;
          },
          error: () => {
            this.loading = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to edit article'})
          }
        })
    } else {
      Object.keys(this.form.controls).forEach(c => {
        this.form.controls[c].markAsDirty()
      })
    }
  }

}
