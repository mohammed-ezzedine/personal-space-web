import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnChanges, PLATFORM_ID, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import hljs from 'highlight.js';

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleContentComponent implements OnChanges {
  
  @Input()
  content: string | undefined;
  
  @ViewChild('content', { static: true })
  contentDiv!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.contentDiv.nativeElement.innerHTML = this.content;

    if (isPlatformBrowser(this.platformId)) {
      let elements = this.contentDiv.nativeElement.getElementsByTagName("pre")
      for (let element of elements) {
        hljs.highlightElement(element);
      }
    }
  }
}
