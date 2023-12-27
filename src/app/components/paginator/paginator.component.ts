import { Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {

  @Input()
  pageIndex: number = 0;

  @Input()
  pageSize: number = 0;

  @Input()
  totalRecords: number = 0;

  @Input()
  styleClass?: string;

  @Output()
  onPageChange = new EventEmitter<PaginatorState>()

  _onPageChange($event: PaginatorState) {
    if($event.page === this.pageIndex) {
      return;
    }

    window.scroll({
      top: 0,
      behavior: 'smooth'
    });

    this.onPageChange.emit($event);
  }

}
