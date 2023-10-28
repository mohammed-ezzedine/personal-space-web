import { Observable } from "rxjs";
import { Category } from "./category";
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment.development";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private readonly baseUrl = `${environment.serverBaseUrl}/api/categories`;

    constructor(private http: HttpClient) { }

    getCategorySummaries(): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseUrl)
    }
}