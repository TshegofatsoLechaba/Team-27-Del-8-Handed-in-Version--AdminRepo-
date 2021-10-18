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
import { Product, ProductCategory, ProductFlavour, ProductSize } from 'src/app/@api/productManagement/productManagement.types';
import { UploadsService } from 'src/app/@api/uploads/uploads.service';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.component.html',
  styleUrls: ['./view-product-details.component.scss']
})
export class ViewProductDetailsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'flavours', 'sizes', 'actions'];

  flavourDisplayedColumns: string[] = ['name', 'actions'];
  flavours: ProductFlavour[] = [];
  flavour: ProductFlavour;
  flavourDataSource;

  photoUrl: any;


  sizeDisplayedColumns: string[] = ['name', 'price', 'actions'];
  sizes: ProductSize[] = [];
  size: ProductSize;
  sizeDataSource


  product: Product;
  displayProgressSpinner = false;

  productId;


  @ViewChild(MatSort, { static: true }) flavourSort: MatSort;
  @ViewChild(MatPaginator, { static: true }) flavourPaginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sizeSort: MatSort;
  @ViewChild(MatPaginator, { static: true }) sizePaginator: MatPaginator;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _ngxSpinner: NgxSpinnerService,
    private _productManagementSerice: ProductManagementService,
    private _uploadsService: UploadsService

  ) {
    this.productId = this._activatedRoute.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.getProductDetailsFromServer();
  }

  flavourApplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.flavourDataSource.filter = filterValue.trim().toLowerCase();
  }

  sizeApplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.sizeDataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddProductFlavour() {

  }

  onUpdateProductFlavour(value: ProductFlavour) {
    // let dialogRef = this._dialog.open(DeleteProductCategoryComponent, {
    //   width: "50%",
    //   height: "auto",
    //   data: {
    //     deleteId: value.id,
    //     deleteName: value.name
    //   }
    // });

    // dialogRef.afterClosed().subscribe(res => {
    //   this.getValuesFromServer();
    // });
  }

  onDeleteProductFlavour(value: ProductFlavour) {
    // let dialogRef = this._dialog.open(DeleteProductCategoryComponent, {
    //   width: "50%",
    //   height: "auto",
    //   data: {
    //     deleteId: value.id,
    //     deleteName: value.name
    //   }
    // });

    // dialogRef.afterClosed().subscribe(res => {
    //   this.getValuesFromServer();
    // });
  }

  onUpdateProduct(value: Product) {
    let dialogRef = this._dialog.open(UpdateProductComponent, {
      width: "80%",
      height: "auto",
      data: {
        updateId: value.id,
        updateName: value.name
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getProductDetailsFromServer();
    });
  }

  private getProductDetailsFromServer() {
    this._productManagementSerice.getProductDetails(this.productId).subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        this._ngxSpinner.show();
      }
      if (event.type === HttpEventType.Response) {
        this.product = event.body as Product;

        this.flavours = this.product.flavours as ProductFlavour[];
        this.flavourDataSource = new MatTableDataSource<ProductFlavour>(this.flavours);
        this.flavourDataSource.sort = this.flavourSort;
        this.flavourDataSource.paginator = this.flavourPaginator;

        this.sizes = this.product.sizes as ProductSize[];
        this.sizeDataSource = new MatTableDataSource<ProductSize>(this.sizes);
        this.sizeDataSource.sort = this.sizeSort;
        this.sizeDataSource.paginator = this.sizePaginator;

        this.onDownloadProductPhoto();
        this._ngxSpinner.hide();
      }
    },
      error => {
        this._ngxSpinner.hide();
        this.openErrorMessageSnackBar(error.error.message);
      });
  }

  private onDownloadProductPhoto() {
    this._uploadsService.downloadProductPhoto(this.productId).subscribe(res => {
      this.createImageFromBlob(res.body);
    });
  }

  private createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.photoUrl = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
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
