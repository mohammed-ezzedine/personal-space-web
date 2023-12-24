import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-hide-input-toggle',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './hide-input-toggle.component.html',
  styleUrl: './hide-input-toggle.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => HideInputToggleComponent)
  }]
})
export class HideInputToggleComponent implements ControlValueAccessor {

  hidden: boolean = false;

  onChange: (value: any) => void = (value: any) => { };

  toggle() {
    this.hidden = !this.hidden;
    this.onChange(this.hidden);
  }
  
  writeValue(obj: any): void {
    this.hidden = obj;
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    
  }

  setDisabledState?(isDisabled: boolean): void {
    
  }
}
