import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable, Optional, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs";
import { CreateArticleRequest } from "./create-article-request";
import { environment } from "src/environments/environment";
import { ArticleCreationResponse } from "./article-creation-response";
import { Article } from "./article";
import { isPlatformServer } from "@angular/common";
import { SERVER_URL } from "../tokens";
import { EditArticleRequest } from "./edit-article-request";
import { ArticleSummary, HighlightedArticleSummary } from "./article-summary";
import { Page } from "../util/pagination/page";
import { HighlightedArticle } from "./highlighted-article";

@Injectable()
export class ArticleService {
    constructor(private http: HttpClient, 
                @Inject(PLATFORM_ID) private platformId: Object,
                @Optional() @Inject(SERVER_URL) private serverUrl: string) { }

    getArticlesSummary(page?: number, pageSize?: number): Observable<Page<ArticleSummary>> {
        let params : HttpParams = new HttpParams();

        if (page) {
            params = params.set("page", page);
        }

        if (pageSize) {
            params = params.set("size", pageSize);
        }

        return this.http.get<Page<ArticleSummary>>(this.getBaseUrl(), { params: params });
    }
    
    getArticle(id: string): Observable<Article> {
        return this.http.get<Article>(`${this.getBaseUrl()}/${id}`);
    }
    
    createArticle(request: CreateArticleRequest): Observable<ArticleCreationResponse> {
        return this.http.post<ArticleCreationResponse>(this.getBaseUrl(), request);
    }

    editArticle(id: string, request: EditArticleRequest): Observable<void> {
        return this.http.put<void>(`${this.getBaseUrl()}/${id}`, request)
    }

    getHighlightedArticles() : Observable<ArticleSummary[]> {
        return this.http.get<ArticleSummary[]>(`${this.getBaseUrl()}/highlight`);
    }

    getHighlightedArticlesSummary() : Observable<HighlightedArticle[]> {
        return this.http.get<HighlightedArticle[]>(`${this.getBaseUrl()}/highlight/summary`);
    }

    addArticleToHighlight(id: string): Observable<void> {
        return this.http.post<void>(`${this.getBaseUrl()}/highlight/${id}`, {})
    }

    removeArticleFromHighlight(id: string): Observable<void> {
        return this.http.delete<void>(`${this.getBaseUrl()}/highlight/${id}`)
    }

    updateArticlesHighlights(articles: HighlightedArticle[]): Observable<void> {
        return this.http.put<void>(`${this.getBaseUrl()}/highlight`, { articles: articles });
    }

    private getBaseUrl() {
        let serverUrl = isPlatformServer(this.platformId)? this.serverUrl : environment.serverBaseUrl;
        return `${serverUrl}/articles`;
    }
}