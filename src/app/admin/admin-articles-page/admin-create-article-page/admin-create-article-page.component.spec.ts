import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateArticlePageComponent } from './admin-create-article-page.component';

describe('AdminCreateArticlePageComponent', () => {
  let component: AdminCreateArticlePageComponent;
  let fixture: ComponentFixture<AdminCreateArticlePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCreateArticlePageComponent]
    });
    fixture = TestBed.createComponent(AdminCreateArticlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
