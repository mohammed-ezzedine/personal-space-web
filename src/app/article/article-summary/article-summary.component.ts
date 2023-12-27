import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CategoryPipe } from 'src/app/category/category.pipe';
import { ArticleSummary } from '../article';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-article-summary',
  standalone: true,
  imports: [CommonModule, RouterModule, CategoryPipe, ButtonModule, ToastModule],
  templateUrl: './article-summary.component.html',
  styleUrl: './article-summary.component.scss'
})
export class ArticleSummaryComponent {

  @Input()
  article!: ArticleSummary;

  @Input()
  small: boolean = false;

  constructor(private router: Router,
              private messageService: MessageService) { }

  copyLink() {
    let articlePath = this.router.parseUrl("/articles/" + this.article.id).toString()
    navigator.clipboard.writeText(window.location.origin + articlePath)
    this.messageService.add({ severity: 'info', detail: 'Article URL copied to the clipboard!'})
  }
}
