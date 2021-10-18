import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ListProductCategoriesComponent } from './pages/productCategories/list-product-categories/list-product-categories.component';
import { ListAllProductsComponent } from './pages/products/list-all-products/list-all-products.component';
import { ListCategoryProductsComponent } from './pages/products/list-category-products/list-category-products.component';
import { ViewProductDetailsComponent } from './pages/products/view-product-details/view-product-details.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: "product-categories/list", component: ListProductCategoriesComponent },
      { path: "product-categories/products/:id", component: ListCategoryProductsComponent },
      { path: "product/:id", component: ViewProductDetailsComponent },
      { path: "products/list", component: ListAllProductsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
