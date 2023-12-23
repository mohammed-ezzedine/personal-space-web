import { Observable } from "rxjs";
import { Category } from "./category";
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment";
import { Inject, Injectable, Optional, PLATFORM_ID } from "@angular/core";
import { CategoryOrder } from "./category-order";
import { CategoryCreationResponse } from "./category-creation-response";
import { SERVER_URL } from "../tokens";
import { isPlatformServer } from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient, 
                @Inject(PLATFORM_ID) private platformId: Object,
                @Optional() @Inject(SERVER_URL) private serverUrl: string) { }

    getCategorySummaries(): Observable<Category[]> {
        return this.http.get<Category[]>(this.getBaseUrl())
    }

    updateCategoriesOrder(categoriesOrders: CategoryOrder[]): Observable<void> {
        return this.http.put<void>(`${this.getBaseUrl()}/orders`, { categoriesOrders: categoriesOrders })
    }

    createNewCategory(categoryCandidateName: string) {
        return this.http.post<CategoryCreationResponse>(this.getBaseUrl(), { name: categoryCandidateName })
    }

    getBaseUrl() {
        let serverUrl = isPlatformServer(this.platformId)? this.serverUrl : environment.serverBaseUrl;
        return `${serverUrl}/categories`;
    }
}