import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SkeletonModule } from 'primeng/skeleton';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleContentSkeletonComponent } from './article/article-page/article-content-skeleton/article-content-skeleton.component';
import { ArticleContentComponent } from './article/article-page/article-content/article-content.component';
import { ArticlePageComponent } from './article/article-page/article-page.component';
import { ArticleSummarySkeletonComponent } from './article/article-summary-skeleton/article-summary-skeleton.component';
import { ArticleSummaryComponent } from './article/article-summary/article-summary.component';
import { CategoryPipe } from './category/category.pipe';
import { CategoryService } from './category/category.service';
import { CategoryEffects } from './category/state/category.effects';
import { categoryReducer } from './category/state/category.reducers';
import { LoaderModule } from './components/loader/loader.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ToastComponent } from './components/toast/toast.component';
import { CategoryArticlesComponent } from './pages/category-articles/category-articles.component';
import { HighlightedArticlesComponent } from './pages/home/highlighted-articles/highlighted-articles.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { LatestArticlesComponent } from './pages/home/latest-articles/latest-articles.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlePageComponent,
    ArticleContentComponent,
    ArticleContentSkeletonComponent,
    HomePageComponent,
    HighlightedArticlesComponent,
    LatestArticlesComponent,
    CategoryArticlesComponent,
    NotFoundComponent
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
    CardModule,
    ArticleSummarySkeletonComponent,
    ToastComponent,
    PaginatorComponent,
    ScrollTopModule,
    SkeletonModule,
    CategoryPipe,
    ButtonModule,
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true,
      }
    }),
    StoreModule.forRoot({ categories: categoryReducer }),
    EffectsModule.forRoot([CategoryEffects])
  ],
  providers: [CategoryService, provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule { }
