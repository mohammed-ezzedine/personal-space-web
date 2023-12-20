import { Observable } from "rxjs";
import { Category } from "./category";
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { CategoryOrder } from "./category-order";
import { CategoryCreationResponse } from "./category-creation-response";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private readonly baseUrl = `${environment.serverBaseUrl}/categories`;

    constructor(private http: HttpClient) { }

    getCategorySummaries(): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseUrl)
    }

    updateCategoriesOrder(categoriesOrders: CategoryOrder[]): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/orders`, { categoriesOrders: categoriesOrders })
    }

    createNewCategory(categoryCandidateName: string) {
        return this.http.post<CategoryCreationResponse>(this.baseUrl, { name: categoryCandidateName })
    }
}