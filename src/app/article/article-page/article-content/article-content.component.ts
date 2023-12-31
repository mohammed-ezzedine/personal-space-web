import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnChanges, PLATFORM_ID, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import hljs from 'highlight.js';
import { MessageService } from 'primeng/api';

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

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private messageService: MessageService) { 
    hljs.configure({
      ignoreUnescapedHTML: true
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.contentDiv.nativeElement.innerHTML = this.content;

    if (isPlatformBrowser(this.platformId)) {
      let elements: HTMLElement[] = this.contentDiv.nativeElement.getElementsByTagName("pre")
      for (let element of elements) {
        this.addCopyCodeButton(element);
        
        hljs.highlightElement(element);
      }
    }
  }

  private addCopyCodeButton(element: HTMLElement) {
    let buttonHolder = document.createElement('div');
    buttonHolder.className = 'flex justify-content-end';

    let button = document.createElement("button");
    button.innerHTML = '<i class="pi pi-copy p-button-icon-left"></i> <span class="">Copy Code</span>';
    button.className = 'copy-code text-color-secondary p-ripple p-element p-button p-button-text p-component text-xs p-1';
    button.onclick = () => this.copyCode(element.innerText);

    buttonHolder.appendChild(button);

    element.parentElement?.insertBefore(buttonHolder, element);
  }

  copyCode(code: string) {
    navigator.clipboard.writeText(code)
      .then(() => this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Code copied to clipboard!'}));

  }
}