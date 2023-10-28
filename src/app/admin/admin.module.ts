import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCategoriesPageComponent } from './admin-categories-page/admin-categories-page.component';
import { CategoryService } from '../category/category.service';
import { TableModule } from 'primeng/table';
import { AdminRoutingModule } from './admin-routing.module';
import { CategoriesDetailsComponent } from './admin-categories-page/categories-details/categories-details.component';


@NgModule({
  declarations: [
    AdminCategoriesPageComponent,
    CategoriesDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule
  ],
  providers: [
    CategoryService
  ]
})
export class AdminModule { }
