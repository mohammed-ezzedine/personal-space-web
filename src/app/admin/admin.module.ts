import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCategoriesPageComponent } from './admin-categories-page/admin-categories-page.component';
import { CategoryService } from '../category/category.service';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AdminRoutingModule } from './admin-routing.module';
import { CategoriesDetailsComponent } from './admin-categories-page/categories-details/categories-details.component';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AdminCategoriesPageComponent,
    CategoriesDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    ToastModule,
    // BrowserAnimationsModule
  ],
  providers: [
    CategoryService,
    MessageService
  ]
})
export class AdminModule { }
