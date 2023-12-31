import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/state/app.state";

export const selectCategoriesState = (state: AppState) => state.categories

export const categories = createSelector(selectCategoriesState, (categories) => categories)
export const category = (id: string) => createSelector(selectCategoriesState, (categories) => categories?.filter(c => c.id === id)[0])
