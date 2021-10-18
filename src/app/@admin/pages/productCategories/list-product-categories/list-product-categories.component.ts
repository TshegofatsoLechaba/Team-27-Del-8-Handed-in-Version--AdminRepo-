import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { ProductManagementService } from 'src/app/@api/productManagement/product-management.service';
import { ProductCategory } from 'src/app/@api/productManagement/productManagement.types';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';
import { AddProductCategoryComponent } from '../add-product-category/add-product-category.component';
import { DeleteProductCategoryComponent } from '../delete-product-category/delete-product-category.component';
import { UpdateProductCategoryComponent } from '../update-product-category/update-product-category.component';

@Component({
  selector: 'app-list-product-categories',
  templateUrl: './list-product-categories.component.html',
  styleUrls: ['./list-product-categories.component.scss']
})
export class ListProductCategoriesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description','actions'];
  dataSource;
  values: ProductCategory[] = [];
  value: ProductCategory;
  displayProgressSpinner = false;


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _ngxSpinner: NgxSpinnerService,
    private _productManagementSerice:ProductManagementService

  ) {
  }

  ngOnInit(): void {
    this.getValuesFromServer();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddValue() {
    let dialogRef = this._dialog.open(AddProductCategoryComponent, {
      width: "80%",
      height: "auto"
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getValuesFromServer();
    });
  }

  onUpdateValue(value:ProductCategory) {
    let dialogRef = this._dialog.open(UpdateProductCategoryComponent, {
      width: "80%",
      height: "auto",
      data: {
        updateId: value.id,
        updateName: value.name
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getValuesFromServer();
    });
  }

  onDeleteValue(value:ProductCategory) {
    let dialogRef = this._dialog.open(DeleteProductCategoryComponent, {
      width: "50%",
      height: "auto",
      data: {
        deleteId: value.id,
        deleteName: value.name
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getValuesFromServer();
    });
  }

  private getValuesFromServer() {
    this._productManagementSerice.getAllProductCategories().subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this.values = event.body as ProductCategory[];
        this.dataSource = new MatTableDataSource<ProductCategory>(this.values);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this._ngxSpinner.hide();
      }
    },
      error => {
        this._ngxSpinner.hide();
        this.openErrorMessageSnackBar(error.error.message);
      });
  }

  onViewProducts(value:ProductCategory){
    this._router.navigate(['/product-categories/products/',value.id])
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
}
