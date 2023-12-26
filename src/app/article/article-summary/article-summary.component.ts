import { Component, Input } from '@angular/core';
import { ArticleSummary } from '../article-summary';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryPipe } from 'src/app/category/category.pipe';

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
