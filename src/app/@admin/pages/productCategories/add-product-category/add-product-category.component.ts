import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductManagementService } from 'src/app/@api/productManagement/product-management.service';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.scss']
})
export class AddProductCategoryComponent implements OnInit {
  errorMessage = "";
  showLoadingEndicator = false;

  form: FormGroup;

  constructor(
    _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddProductCategoryComponent>,
    private _ngxSpinner: NgxSpinnerService,
    private _productsManagementService: ProductManagementService

  ) {
    this.buildAddForm(_formBuilder);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.form.valid) {
      this._productsManagementService.addProductCategory(this.form.value)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this._ngxSpinner.show();
          }
          if (event.type === HttpEventType.Response) {
            this._ngxSpinner.hide();
            this.openSnackBar("Add Product Category", "Success!", 3000);
            this.closeDialog();
          }
        },
          error => {
            this._ngxSpinner.hide();
            this.errorMessage = error.error.message;
          });
    }
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

  private openErrorMessageSnackBar(errorMessage: string) {
    const snackBar = this._snackBar.openFromComponent(CustomErrorSnackBarComponent, {
      data: {
        preClose: () => { snackBar.dismiss() },
        parent: errorMessage
      },
      horizontalPosition: 'start',
      verticalPosition: 'bottom'
    });
  }

  private buildAddForm(_formBuilder: FormBuilder) {
    this.form = _formBuilder.group({
      Name: ["", Validators.required],
      Description: ["", Validators.required],
    });
  }

  get Name() {
    return this.form.get('Name');
  }
  get Description() {
    return this.form.get('Description');
  }


}

