import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-article-summary-skeleton',
  standalone: true,
  imports: [SkeletonModule, CommonModule],
  templateUrl: './article-summary-skeleton.component.html',
  styleUrl: './article-summary-skeleton.component.scss'
})
export class ArticleSummarySkeletonComponent implements OnInit {

  @Input()
  repeat: number = 1;

  @Input()
  border: boolean = true

  times: any[] = []

  ngOnInit(): void {
    this.times = new Array(this.repeat)
  }
}
