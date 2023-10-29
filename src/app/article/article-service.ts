import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateArticleRequest } from "./create-article-request";
import { environment } from "src/environments/environment.development";
import { ArticleCreationResponse } from "./article-creation-response";

@Injectable()
export class ArticleService {
    private readonly baseUrl = `${environment.serverBaseUrl}/api/articles`;

    constructor(private http: HttpClient) { }

    createArticle(request: CreateArticleRequest): Observable<ArticleCreationResponse> {
        return this.http.post<ArticleCreationResponse>(this.baseUrl, request);
    }
}