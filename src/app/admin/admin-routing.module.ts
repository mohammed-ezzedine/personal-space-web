import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminCategoriesPageComponent } from "./admin-categories-page/admin-categories-page.component";
import { AdminArticlesPageComponent } from "./admin-articles-page/admin-articles-page.component";
import { AdminCreateArticlePageComponent } from "./admin-articles-page/admin-create-article-page/admin-create-article-page.component";

const routes: Routes = [
    { path: 'categories', component: AdminCategoriesPageComponent },
    { path: 'articles', component: AdminArticlesPageComponent },
    { path: 'articles/new-article', component: AdminCreateArticlePageComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }