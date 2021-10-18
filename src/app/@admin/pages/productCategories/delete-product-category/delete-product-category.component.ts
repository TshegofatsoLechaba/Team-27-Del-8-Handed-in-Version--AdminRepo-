import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductManagementService } from 'src/app/@api/productManagement/product-management.service';
import { ProductCategory } from 'src/app/@api/productManagement/productManagement.types';
import { UpdateProductCategoryComponent } from '../update-product-category/update-product-category.component';

@Component({
  selector: 'app-delete-product-category',
  templateUrl: './delete-product-category.component.html',
  styleUrls: ['./delete-product-category.component.scss']
})
export class DeleteProductCategoryComponent implements OnInit {

  deleteName;
  deleteId;
  updateRecord: ProductCategory;

  errorMessage = "";
  showLoadingEndicator = false;


  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteProductCategoryComponent>,
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
    this._productManagementService.deleteProductCategory(this.deleteId)
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
    this._productManagementService.getProductCategory(this.deleteId).subscribe(event => {
      if (event.type === HttpEventType.Sent) {

      }
      if (event.type === HttpEventType.Response) {
        this.updateRecord = event.body as ProductCategory;
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
