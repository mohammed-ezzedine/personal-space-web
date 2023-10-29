import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, catchError, takeUntil } from 'rxjs';
import { ArticleService } from 'src/app/article/article-service';

@Component({
  selector: 'app-admin-create-article-page',
  templateUrl: './admin-create-article-page.component.html',
  styleUrls: ['./admin-create-article-page.component.scss']
})
export class AdminCreateArticlePageComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject();

  loadingArticleCreation: boolean = false;

  form: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
    content: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, 
              private articleService: ArticleService, 
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  createArticle() {
    if (this.form.valid) {
      this.loadingArticleCreation = true;
      this.articleService.createArticle(this.form.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: response => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Article created successfully'})
            this.router.navigate(['articles', response.id])
            this.loadingArticleCreation = false;
          },
          error: error => {
            this.loadingArticleCreation = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create article'})
          }
        })
    } else {
      Object.keys(this.form.controls).forEach(c => {
        this.form.controls[c].markAsDirty()
      })
    }
  }

}
