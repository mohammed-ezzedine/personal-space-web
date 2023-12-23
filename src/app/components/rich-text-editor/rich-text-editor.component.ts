import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CkeditorAdapterComponent } from './ckeditor-adapter/ckeditor-adapter.component';

@Component({
  selector: 'app-rich-text-editor',
  standalone: true,
  imports: [CkeditorAdapterComponent],
  templateUrl: './rich-text-editor.component.html',
  styleUrl: './rich-text-editor.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RichTextEditorComponent)
  }]
})
export class RichTextEditorComponent implements ControlValueAccessor {

  data: string = ''

  onChange: (value: any) => void = (_value: any) => { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(_fn: any): void {  
  }
  
  setDisabledState?(_isDisabled: boolean): void {
  }

  writeValue(_obj: string): void {
    this.data = _obj;
  }
}
