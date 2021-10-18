import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductCategoriesComponent } from './list-product-categories.component';

describe('ListProductCategoriesComponent', () => {
  let component: ListProductCategoriesComponent;
  let fixture: ComponentFixture<ListProductCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
