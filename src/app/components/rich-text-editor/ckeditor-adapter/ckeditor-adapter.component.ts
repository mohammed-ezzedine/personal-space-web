import { Component, Input, Renderer2, afterNextRender } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ckeditor-adapter',
  standalone: true,
  imports: [CKEditorModule],
  templateUrl: './ckeditor-adapter.component.html',
  styleUrl: './ckeditor-adapter.component.scss'
})
export class CkeditorAdapterComponent {

  @Input()
  data: string = '';

  @Input()
  onChange: (value: any) => void = (_value: any) => { };

  constructor(renderer: Renderer2,
              oauthService: OAuthService) {
    afterNextRender(() => {
      import('ckeditor-custom-build').then(Editor => {

        let editorElement = renderer.createElement("ckeditor")

        renderer.appendChild(document.getElementById("editor")!, editorElement);

        Editor.default.Editor.create(editorElement, { 
          simpleUpload: {
            uploadUrl: `${environment.serverBaseUrl}/articles/images`,
            withCredentials: true,
            headers: {
              'X-CSRF-TOKEN': 'CSRF-TOKEN',
              'Authorization': `Bearer ${oauthService.getAccessToken()}`
            }
          }
        })
          .then(editorHtmlElement => {
            editorHtmlElement.model.document.on('change:data', (_event, _data) => {
              this.onChange(editorHtmlElement.getData())
            })

            editorHtmlElement.data.set(this.data);
            
          });

      })
    })
}

}
