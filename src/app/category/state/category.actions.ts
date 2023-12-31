import { createAction, props } from "@ngrx/store";
import { Category } from "../category";

export const fetchCategories = createAction('[Categories API] Fetch');
export const fetchedCategoriesSuccessfully = createAction('[Categories API] Categories Fetch Success', props<{ categories: Category[] }>());
export const failedToFetchCategories = createAction('[Categories API] Categories Fetch Failure');