import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss']
})
export class ArticleContentComponent implements OnChanges {

  @Input()
  content: string | undefined;

  @ViewChild('content', { static: true })
  contentDiv!: ElementRef;
  
  ngOnChanges(changes: SimpleChanges): void {
    this.contentDiv.nativeElement.innerHTML = this.content
  }
}
