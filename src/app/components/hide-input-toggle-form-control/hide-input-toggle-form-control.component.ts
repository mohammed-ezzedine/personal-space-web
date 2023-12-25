import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-hide-input-toggle-form-control',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './hide-input-toggle-form-control.component.html',
  styleUrl: './hide-input-toggle-form-control.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => HideInputToggleFormControlComponent)
  }]
})
export class HideInputToggleFormControlComponent implements ControlValueAccessor {

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
