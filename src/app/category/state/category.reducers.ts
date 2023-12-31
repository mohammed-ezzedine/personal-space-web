import { createReducer, on } from "@ngrx/store";
import { failedToFetchCategories, fetchedCategoriesSuccessfully } from "./category.actions";
import { Category } from "../category";

export const initialCategoryState: Category[] = [];

export const categoryReducer = createReducer(
    initialCategoryState,
    on(fetchedCategoriesSuccessfully, (_, action ) => {
        return action.categories
    }),
    on(failedToFetchCategories, (state) => state)
)