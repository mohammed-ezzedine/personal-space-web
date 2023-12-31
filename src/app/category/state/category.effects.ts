import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { CategoryService } from "../category.service";
import { failedToFetchCategories, fetchCategories, fetchedCategoriesSuccessfully } from "./category.actions";

@Injectable()
export class CategoryEffects {

    constructor(private actions$: Actions, private categoryService: CategoryService) { }

    loadCategories$ = createEffect(() => this.actions$.pipe(
        ofType(fetchCategories),
        exhaustMap(() => this.categoryService.getCategorySummaries()
            .pipe(
                map( categories => ({ type: fetchedCategoriesSuccessfully.type, categories: categories })),    
                catchError(() => of({ type: failedToFetchCategories.type }))
            )
        )
    ))
}