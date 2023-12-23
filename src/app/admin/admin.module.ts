import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCategoriesPageComponent } from './admin-categories-page/admin-categories-page.component';
import { CategoryService } from '../category/category.service';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AdminRoutingModule } from './admin-routing.module';
import { CategoriesDetailsComponent } from './admin-categories-page/categories-details/categories-details.component';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule  } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { ChipsModule } from 'primeng/chips';
import { DataViewModule } from 'primeng/dataview';
import { KeyFilterModule } from 'primeng/keyfilter';
import {MessageModule} from 'primeng/message'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminArticlesPageComponent } from './admin-articles-page/admin-articles-page.component';
import { AdminCreateArticlePageComponent } from './admin-articles-page/admin-create-article-page/admin-create-article-page.component';
import { CategoriesDropdownComponent } from './admin-articles-page/categories-dropdown/categories-dropdown.component';
import { DropdownModule } from 'primeng/dropdown';
import { ArticleService } from '../article/article-service';
import { LoaderModule } from '../components/loader/loader.module';
import { RichTextEditorComponent } from '../components/rich-text-editor/rich-text-editor.component';
import { AdminEditArticlePageComponent } from './admin-articles-page/admin-edit-article-page/admin-edit-article-page.component';
import { AdminArticlesSummaryComponent } from './admin-articles-page/admin-articles-summary/admin-articles-summary.component';

@NgModule({
  declarations: [
    AdminCategoriesPageComponent,
    CategoriesDetailsComponent,
    AdminArticlesPageComponent,
    AdminCreateArticlePageComponent,
    AdminEditArticlePageComponent,
    CategoriesDropdownComponent,
    AdminArticlesSummaryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    ToastModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    KeyFilterModule,
    MessageModule,
    DropdownModule,
    LoaderModule,
    RichTextEditorComponent,
    ImageModule,
    ChipsModule,
    DataViewModule
  ],
  providers: [
    CategoryService,
    MessageService,
    ArticleService
  ]
})
export class AdminModule { }
