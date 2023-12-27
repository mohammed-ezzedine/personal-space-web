import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable, Optional, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs";
import { CreateArticleRequest } from "./create-article-request";
import { environment } from "src/environments/environment";
import { ArticleCreationResponse } from "./article-creation-response";
import { Article, ArticleSummary } from "./article";
import { isPlatformServer } from "@angular/common";
import { SERVER_URL } from "../tokens";
import { EditArticleRequest } from "./edit-article-request";
import { Page } from "../util/pagination/page";
import { ArticleHighlightSummary } from "./article-highlight-summary";

@Injectable()
export class ArticleService {
    constructor(private http: HttpClient, 
                @Inject(PLATFORM_ID) private platformId: Object,
                @Optional() @Inject(SERVER_URL) private serverUrl: string) { }

    getArticlesSummary(page?: number, pageSize?: number, sortBy?: string, ascOrder?: boolean): Observable<Page<ArticleSummary>> {
        let params : HttpParams = new HttpParams();

        if (page !== undefined) {
            params = params.set("page", page);

            if (pageSize !== undefined) {
                params = params.set("size", pageSize);
            }
        }

        if (sortBy !== undefined) {
            params = params.set("sortBy", sortBy);

            if (ascOrder !== undefined) {
                params = params.set("ascOrder", ascOrder)
            }
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

    getArticleHighlightsSummary() : Observable<ArticleHighlightSummary[]> {
        return this.http.get<ArticleHighlightSummary[]>(`${this.getBaseUrl()}/highlight/summary`);
    }

    addArticleToHighlight(id: string): Observable<void> {
        return this.http.post<void>(`${this.getBaseUrl()}/highlight/${id}`, {})
    }

    removeArticleFromHighlight(id: string): Observable<void> {
        return this.http.delete<void>(`${this.getBaseUrl()}/highlight/${id}`)
    }

    updateArticlesHighlights(articles: ArticleHighlightSummary[]): Observable<void> {
        return this.http.put<void>(`${this.getBaseUrl()}/highlight`, { articles: articles });
    }

    private getBaseUrl() {
        let serverUrl = isPlatformServer(this.platformId)? this.serverUrl : environment.serverBaseUrl;
        return `${serverUrl}/articles`;
    }
}