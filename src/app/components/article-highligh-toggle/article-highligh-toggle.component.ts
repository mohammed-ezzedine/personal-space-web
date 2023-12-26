import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-article-highligh-toggle',
  standalone: true,
  imports: [ButtonModule, CommonModule, TooltipModule],
  templateUrl: './article-highligh-toggle.component.html',
  styleUrl: './article-highligh-toggle.component.scss'
})
export class ArticleHighlighToggleComponent {
  @Input()
  highlighted: boolean = false;

  @Output()
  highlightChange = new EventEmitter<boolean>();


  toggle() {
    this.highlighted = !this.highlighted;
    this.highlightChange.emit(this.highlighted);
  }
}
