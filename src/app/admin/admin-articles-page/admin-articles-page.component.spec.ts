import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticlesPageComponent } from './admin-articles-page.component';

describe('AdminArticlesPageComponent', () => {
  let component: AdminArticlesPageComponent;
  let fixture: ComponentFixture<AdminArticlesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminArticlesPageComponent]
    });
    fixture = TestBed.createComponent(AdminArticlesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
