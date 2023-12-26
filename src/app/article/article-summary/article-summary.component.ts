import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryPipe } from 'src/app/category/category.pipe';
import { ArticleSummary } from '../article';

@Component({
  selector: 'app-article-summary',
  standalone: true,
  imports: [CommonModule, RouterModule, CategoryPipe],
  templateUrl: './article-summary.component.html',
  styleUrl: './article-summary.component.scss'
})
export class ArticleSummaryComponent {

  @Input()
  article!: ArticleSummary;
}
