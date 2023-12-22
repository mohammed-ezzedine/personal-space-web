import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Optional, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs";
import { CreateArticleRequest } from "./create-article-request";
import { environment } from "src/environments/environment";
import { ArticleCreationResponse } from "./article-creation-response";
import { Article } from "./article";
import { isPlatformServer } from "@angular/common";
import { SERVER_URL } from "../tokens";

@Injectable()
export class ArticleService {
    constructor(private http: HttpClient, 
                @Inject(PLATFORM_ID) private platformId: Object,
                @Optional() @Inject(SERVER_URL) private serverUrl: string) { }
    
    createArticle(request: CreateArticleRequest): Observable<ArticleCreationResponse> {
        return this.http.post<ArticleCreationResponse>(this.getBaseUrl(), request);
    }
    
    getArticle(id: string): Observable<Article> {
        return this.http.get<Article>(`${this.getBaseUrl()}/${id}`);
    }

    getBaseUrl() {
        let serverUrl = isPlatformServer(this.platformId)? this.serverUrl : environment.serverBaseUrl;
        return `${serverUrl}/articles`;
    }
}