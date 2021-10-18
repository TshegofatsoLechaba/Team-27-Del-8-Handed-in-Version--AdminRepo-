import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { ProductManagementService } from 'src/app/@api/productManagement/product-management.service';
import { Product, ProductCategory } from 'src/app/@api/productManagement/productManagement.types';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';
import { DeleteProductCategoryComponent } from '../../productCategories/delete-product-category/delete-product-category.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';

@Component({
  selector: 'app-list-all-products',
  templateUrl: './list-all-products.component.html',
  styleUrls: ['./list-all-products.component.scss']
})
export class ListAllProductsComponent implements OnInit {
  displayedColumns: string[] = ['categoryName','name', 'description','quantityOnHand', 'flavours', 'sizes', 'actions'];
  dataSource;

  values: Product[] = [];
  value: Product;

  displayProgressSpinner = false;



  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _ngxSpinner: NgxSpinnerService,
    private _productManagementSerice: ProductManagementService

  ) {
  }

  ngOnInit(): void {
    this.getAllProductsFromServer();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onViewProductDetails(value: Product) {
  this._router.navigate(['/product',value.id])
  }

  onDeleteValue(value: Product) {
    let dialogRef = this._dialog.open(DeleteProductComponent, {
      width: "50%",
      height: "auto",
      data: {
        deleteId: value.id,
        deleteName: value.name
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getAllProductsFromServer();
    });
  }


  private getAllProductsFromServer() {
    this._productManagementSerice.getAllProducts().subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this.values = event.body as Product[];
        this.dataSource = new MatTableDataSource<Product>(this.values);
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
