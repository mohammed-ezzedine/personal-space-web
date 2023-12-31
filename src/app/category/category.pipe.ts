import { Pipe, PipeTransform } from '@angular/core';
import { CategoryService } from './category.service';
import { Observable, map, skipWhile } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { category } from './state/category.selectors';

@Pipe({
  name: 'category',
  standalone: true
})
export class CategoryPipe implements PipeTransform {

  constructor(private store: Store<AppState>) { }

  transform(value: string): Observable<string> {
    return this.store.select(category(value)).pipe(
      skipWhile(category => !category),
      map(category => category.name)
    )
  }

}
