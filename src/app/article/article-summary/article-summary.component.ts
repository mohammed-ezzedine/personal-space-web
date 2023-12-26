import { Component, Input } from '@angular/core';
import { ArticleSummary } from '../article-summary';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-article-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './article-summary.component.html',
  styleUrl: './article-summary.component.scss'
})
export class ArticleSummaryComponent {

  @Input()
  article!: ArticleSummary;
}
