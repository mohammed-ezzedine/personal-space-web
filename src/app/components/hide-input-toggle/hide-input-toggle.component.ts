import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-hide-input-toggle',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './hide-input-toggle.component.html',
  styleUrl: './hide-input-toggle.component.scss'
})
export class HideInputToggleComponent {

  @Input()
  hidden: boolean = false;

  @Output()
  visibilityChange = new EventEmitter<boolean>();


  toggle() {
    this.hidden = !this.hidden;
    this.visibilityChange.emit(this.hidden);
  }
}
