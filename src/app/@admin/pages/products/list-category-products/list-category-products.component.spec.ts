import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoryProductsComponent } from './list-category-products.component';

describe('ListCategoryProductsComponent', () => {
  let component: ListCategoryProductsComponent;
  let fixture: ComponentFixture<ListCategoryProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCategoryProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategoryProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
