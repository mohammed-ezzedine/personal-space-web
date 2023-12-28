import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlePageComponent } from './article/article-page/article-page.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { authGuard } from './security/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuard]
  },
  {
    path: 'articles/:articleId',
    component: ArticlePageComponent
  },
  {
    path: '',
    component: HomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
