import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductManagementService } from 'src/app/@api/productManagement/product-management.service';
import { ProductCategory } from 'src/app/@api/productManagement/productManagement.types';

@Component({
  selector: 'app-update-product-category',
  templateUrl: './update-product-category.component.html',
  styleUrls: ['./update-product-category.component.scss']
})
export class UpdateProductCategoryComponent implements OnInit {
  updateName;
  updateId;
  updateRecord: ProductCategory;

  errorMessage = "";
  showLoadingEndicator = false;

  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateProductCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,

    private _productManagementService: ProductManagementService

  ) {
    this.updateId = dataFromParent.updateId;
    this.updateName = dataFromParent.updateName;
  }


  ngOnInit(): void {
    this.getUpdateRecordFromDb();
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.form.valid) {
      this._productManagementService.updateProductCategory(this.form.value, this.updateId)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
          }
          if (event.type === HttpEventType.Response) {
            this.openSnackBar("Update", "Success!", 3000);
            this.closeDialog();
          }
        },
          error => {
            this.errorMessage = error.error.message;
          })
    }
  }

  private getUpdateRecordFromDb() {
    this._productManagementService.getProductCategory(this.updateId).subscribe(event => {
      if (event.type === HttpEventType.Sent) {

      }
      if (event.type === HttpEventType.Response) {
        this.updateRecord = event.body as ProductCategory;
        this.buildForm(this._formBuilder);
      }
    });
  }

  private buildForm(_formBuilder: FormBuilder) {
    this.form = _formBuilder.group({
      Name: [this.updateRecord.name, Validators.required],
      Description: [this.updateRecord.description, Validators.required],
    });
  }

  get Name() {
    return this.form.get('Name');
  }

  get Description() {
    return this.form.get('Description');
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

