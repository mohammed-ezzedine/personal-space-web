import { Component, Input, Renderer2, afterNextRender } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-ckeditor-adapter',
  standalone: true,
  imports: [CKEditorModule],
  templateUrl: './ckeditor-adapter.component.html',
  styleUrl: './ckeditor-adapter.component.scss'
})
export class CkeditorAdapterComponent {

  @Input()
  onChange: (value: any) => void = (_value: any) => { };

  constructor(private renderer: Renderer2) {
    afterNextRender(() => {
      import('ckeditor-custom-build').then(Editor => {

        let editorElement = this.renderer.createElement("ckeditor")

        this.renderer.appendChild(document.getElementById("editor")!, editorElement);

        Editor.default.Editor.create(editorElement)
          .then(editorHtmlElement => {
            editorHtmlElement.model.document.on('change:data', (_event, _data) => {
              this.onChange(editorHtmlElement.getData())
            })
          });

      })
    })
}

}
