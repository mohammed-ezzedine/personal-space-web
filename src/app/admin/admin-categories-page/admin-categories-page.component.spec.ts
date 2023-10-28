import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoriesPageComponent } from './admin-categories-page.component';

describe('CategoriesComponent', () => {
  let component: AdminCategoriesPageComponent;
  let fixture: ComponentFixture<AdminCategoriesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCategoriesPageComponent]
    });
    fixture = TestBed.createComponent(AdminCategoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
