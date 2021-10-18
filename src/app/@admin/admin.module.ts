import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ListProductCategoriesComponent } from './pages/productCategories/list-product-categories/list-product-categories.component';
import { AddProductCategoryComponent } from './pages/productCategories/add-product-category/add-product-category.component';
import { UpdateProductCategoryComponent } from './pages/productCategories/update-product-category/update-product-category.component';
import { SharedModule } from '../shared/shared.module';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import { ListAllProductsComponent } from './pages/products/list-all-products/list-all-products.component';
import { ListCategoryProductsComponent } from './pages/products/list-category-products/list-category-products.component';
import { UpdateProductComponent } from './pages/products/update-product/update-product.component';
import { DeleteProductCategoryComponent } from './pages/productCategories/delete-product-category/delete-product-category.component';
import { ViewProductDetailsComponent } from './pages/products/view-product-details/view-product-details.component';
import { DeleteProductComponent } from './pages/products/delete-product/delete-product.component';


@NgModule({
  declarations: [
    AdminComponent,
    ListProductCategoriesComponent,
    AddProductCategoryComponent,
    UpdateProductCategoryComponent,
    AddProductComponent,
    ListAllProductsComponent,
    ListCategoryProductsComponent,
    UpdateProductComponent,
    DeleteProductCategoryComponent,
    ViewProductDetailsComponent,
    DeleteProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
