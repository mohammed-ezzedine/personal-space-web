import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './category/category.service';
import { CommonModule } from '@angular/common';
import { AdminModule } from './admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ArticlePageComponent } from './article/article-page/article-page.component';
import { LoaderModule } from './components/loader/loader.module';
import { ArticleContentComponent } from './article/article-page/article-content/article-content.component';
import { ImageModule } from 'primeng/image';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { HighlightedArticlesComponent } from './pages/home/highlighted-articles/highlighted-articles.component';
import { ArticleSummaryComponent } from './article/article-summary/article-summary.component';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    AppComponent,
    ArticlePageComponent,
    ArticleContentComponent,
    HomePageComponent,
    HighlightedArticlesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    AdminModule,
    BrowserAnimationsModule,
    ImageModule,
    ChipModule,
    ProgressSpinnerModule,
    LoaderModule,
    DividerModule,
    NavbarComponent,
    ArticleSummaryComponent,
    CardModule
  ],
  providers: [CategoryService, provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule { }
