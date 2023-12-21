import { Component, Input, forwardRef } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import * as Editor from 'ckeditor-custom-build'
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rich-text-editor',
  standalone: true,
  imports: [CKEditorModule],
  templateUrl: './rich-text-editor.component.html',
  styleUrl: './rich-text-editor.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RichTextEditorComponent)
  }]
})
export class RichTextEditorComponent implements ControlValueAccessor {

  @Input()
  formControl!: FormControl;

  editor = Editor.default.Editor;

  value: string  = '';

  onChange = (value: any) => { };

  updateContent(event: any) {
    this.onChange(event.editor.getData())
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    
  }
  
  setDisabledState?(isDisabled: boolean): void {
    
  }

  writeValue(obj: string): void {
  }
}
