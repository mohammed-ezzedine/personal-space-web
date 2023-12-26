import { Pipe, PipeTransform } from '@angular/core';
import { CategoryService } from './category.service';
import { Observable, map } from 'rxjs';

@Pipe({
  name: 'category',
  standalone: true
})
export class CategoryPipe implements PipeTransform {

  constructor(private categoryService: CategoryService) { }

  transform(value: string): Observable<string> {
    return this.categoryService.getCategoryDetails(value).pipe(
      map(category => category.name)
    )
  }

}
