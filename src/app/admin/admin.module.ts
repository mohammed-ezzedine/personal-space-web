import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageModule } from 'primeng/message';
import { OrderListModule } from 'primeng/orderlist';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ArticleReadTimeEstimatorService } from '../article/article-read-time-estimator.service';
import { ArticleService } from '../article/article-service';
import { ArticleSummarySkeletonComponent } from '../article/article-summary-skeleton/article-summary-skeleton.component';
import { ArticleSummaryComponent } from '../article/article-summary/article-summary.component';
import { CategoryService } from '../category/category.service';
import { ArticleHighlighToggleComponent } from '../components/article-highligh-toggle/article-highligh-toggle.component';
import { HideInputToggleFormControlComponent } from '../components/hide-input-toggle-form-control/hide-input-toggle-form-control.component';
import { HideInputToggleComponent } from '../components/hide-input-toggle/hide-input-toggle.component';
import { LoaderModule } from '../components/loader/loader.module';
import { PaginatorComponent } from '../components/paginator/paginator.component';
import { RichTextEditorComponent } from '../components/rich-text-editor/rich-text-editor.component';
import { AdminArticlesPageComponent } from './admin-articles-page/admin-articles-page.component';
import { AdminArticlesSummaryComponent } from './admin-articles-page/admin-articles-summary/admin-articles-summary.component';
import { AdminCreateArticlePageComponent } from './admin-articles-page/admin-create-article-page/admin-create-article-page.component';
import { AdminEditArticlePageComponent } from './admin-articles-page/admin-edit-article-page/admin-edit-article-page.component';
import { AdminHighlightedArticlesPageComponent } from './admin-articles-page/admin-highlighted-articles-page/admin-highlighted-articles-page.component';
import { CategoriesDropdownComponent } from './admin-articles-page/categories-dropdown/categories-dropdown.component';
import { AdminCategoriesPageComponent } from './admin-categories-page/admin-categories-page.component';
import { CategoriesDetailsComponent } from './admin-categories-page/categories-details/categories-details.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ToastComponent } from '../components/toast/toast.component';

@NgModule({
  declarations: [
    AdminCategoriesPageComponent,
    CategoriesDetailsComponent,
    AdminArticlesPageComponent,
    AdminCreateArticlePageComponent,
    AdminEditArticlePageComponent,
    CategoriesDropdownComponent,
    AdminArticlesSummaryComponent,
    AdminHighlightedArticlesPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    ToastComponent,
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
    DataViewModule,
    PaginatorComponent,
    HideInputToggleFormControlComponent,
    HideInputToggleComponent,
    OrderListModule,
    ArticleHighlighToggleComponent,
    ArticleSummaryComponent,
    TooltipModule,
    ArticleSummarySkeletonComponent
  ],
  providers: [
    CategoryService,
    MessageService,
    ArticleService,
    ArticleReadTimeEstimatorService
  ]
})
export class AdminModule { }
