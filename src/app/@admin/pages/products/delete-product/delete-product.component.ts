import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductManagementService } from 'src/app/@api/productManagement/product-management.service';
import { Product, ProductCategory } from 'src/app/@api/productManagement/productManagement.types';
import { DeleteProductCategoryComponent } from '../../productCategories/delete-product-category/delete-product-category.component';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {
  deleteName;
  deleteId;
  updateRecord: Product;

  errorMessage = "";
  showLoadingEndicator = false;


  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,

    private _productManagementService: ProductManagementService

  ) {
    this.deleteId = dataFromParent.deleteId;
    this.deleteName = dataFromParent.deleteName;
  }


  ngOnInit(): void {
    this.getDeleteRecordFromDb();
  }

  onSubmit() {
    this.errorMessage = "";
    this._productManagementService.deleteProduct(this.deleteId)
      .subscribe(event => {
        if (event.type === HttpEventType.Sent) {
        }
        if (event.type === HttpEventType.Response) {
          this.openSnackBar("Delete", "Success!", 3000);
          this.closeDialog();
        }
      },
        error => {
          this.errorMessage = error.error.message;
        })

  }

  private getDeleteRecordFromDb() {
    this._productManagementService.getProductDetails(this.deleteId).subscribe(event => {
      if (event.type === HttpEventType.Sent) {

      }
      if (event.type === HttpEventType.Response) {
        this.updateRecord = event.body as Product;
      }
    });
  }

  private closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  private openSnackBar(message: string, action: string, _duration: number) {
    this._snackBar.open(message, action, {
      duration: _duration,
      verticalPosition: 'top'
    });
  }

}
