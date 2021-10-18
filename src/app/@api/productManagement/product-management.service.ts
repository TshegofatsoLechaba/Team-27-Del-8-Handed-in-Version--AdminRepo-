import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {

  endpointBase = environment.endpointBase;

  constructor(
    private _httpClient: HttpClient,
  ) { }

  //Start Product Category

  addProductCategory(payload) {
    return this._httpClient.post(this.endpointBase.concat("ProductCategories/Add"),
      payload, { reportProgress: true, observe: 'events' });
  }

  updateProductCategory(payload, id: number) {
    return this._httpClient.put(this.endpointBase.concat("ProductCategories/Update/" + id),
      payload, { reportProgress: true, observe: 'events' });
  }

  getProductCategory(id: number) {
    return this._httpClient.get(this.endpointBase.concat("ProductCategories/" + id),
      { reportProgress: true, observe: 'events' });
  }

  getAllProductCategories() {
    return this._httpClient.get(this.endpointBase.concat("ProductCategories/All"),
      { reportProgress: true, observe: 'events' });
  }

  deleteProductCategory(id: number) {
    return this._httpClient.delete(this.endpointBase.concat("ProductCategories/Delete/" + id),
      { reportProgress: true, observe: 'events' });
  }

  //End Product Category


  //Start Products
  addProduct(payload) {
    return this._httpClient.post(this.endpointBase.concat("Products/Add"),
      payload, { reportProgress: true, observe: 'events' });
  }

  updateProduct(payload, id: number) {
    return this._httpClient.put(this.endpointBase.concat("Products/Update/" + id),
      payload, { reportProgress: true, observe: 'events' });
  }

  getAllCategoryProducts(categoryId: number) {
    return this._httpClient.get(this.endpointBase.concat("Products/All/" + categoryId),
      { reportProgress: true, observe: 'events' });
  }

  getAllProducts() {
    return this._httpClient.get(this.endpointBase.concat("Products/All"),
      { reportProgress: true, observe: 'events' });
  }

  getProductDetails(productId: number) {
    return this._httpClient.get(this.endpointBase.concat("Products/" + productId),
      { reportProgress: true, observe: 'events' });
  }

  deleteProduct(id: number) {
    return this._httpClient.delete(this.endpointBase.concat("Products/Delete/" + id),
      { reportProgress: true, observe: 'events' });
  }


  //End Products

}
