import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ProductManagementService } from 'src/app/@api/productManagement/product-management.service';
import { UploadFinishedEventArgs } from 'src/app/@api/shared/shared.types';
import { UploadsService } from 'src/app/@api/uploads/uploads.service';
import { CustomErrorSnackBarComponent } from 'src/app/@material/custom-components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  flavours: any[] = [];
  sizes: any[] = [];
  formToSendToServer: any = {};

  categoryName;
  categoryId;

  errorMessage = "";
  showLoadingEndicator = false;

  imageUrl: string = "";
  backgroundImg: string = "";

  selectedImage: File;
  uploadUrlFromServer: UploadFinishedEventArgs;
  fileToUpload: File = null;

  incorrectTypeErrorMessage = null;
  progress;
  showProgress = false;
  @Output('onFiles') onFiles = new EventEmitter<any>();


  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _ngxSpinner: NgxSpinnerService,

    private _uploadsService: UploadsService,
    private _productsManagementService: ProductManagementService

  ) {
    this.categoryName = dataFromParent.categoryName;
    this.categoryId = dataFromParent.categoryId;
  }

  ngOnInit(): void {
    this.buildProductForm();
    this.showImageBackground("/assets/images/default-upload-image.png");
  }

  onAddFlavour(flavour: string) {
    let flavourObj: any = {}

    flavourObj.Name = flavour;

    this.flavours.push(flavourObj);
  }

  onRemoveFlavour(flavor: any) {
    let index = this.flavours.indexOf(flavor);
    if (index > -1) {
      this.flavours.splice(index, 1);
    }
  }

  onAddSize(size: string, price: string) {
    let sizeObj: any = {}

    sizeObj.Size = size;
    sizeObj.Price = price;
    this.sizes.push(sizeObj);
  }

  private prepareFormToSendToServer() {
    this.formToSendToServer['Name'] = this.Name.value;
    this.formToSendToServer['Description'] = this.Description.value;
    this.formToSendToServer['Quantity'] = this.Quantity.value;
    this.formToSendToServer['CategoryId'] = this.categoryId;
    this.formToSendToServer['PhotoUrl'] = this.uploadUrlFromServer.filePath;
    this.formToSendToServer['Flavours'] = this.flavours;
    this.formToSendToServer['Sizes'] = this.sizes;

  }

  onSubmit() {
    this.prepareFormToSendToServer();

    console.log(this.formToSendToServer);

    this.errorMessage = "";
    this._productsManagementService.addProduct(this.formToSendToServer)
      .subscribe(event => {
        if (event.type === HttpEventType.Sent) {
          this._ngxSpinner.show();
        }
        if (event.type === HttpEventType.Response) {
          this._ngxSpinner.hide();
          this.openSnackBar("Add Product", "Success!", 3000);
          this.closeDialog();
        }
      },
        error => {
          this._ngxSpinner.hide();
          this.errorMessage = error.error.message;
        });


  }

  addFile(element: Event) {
    const elementTarget = element.target as HTMLInputElement;
    const image = elementTarget.files.item(0);

    this.incorrectTypeErrorMessage = null;
    const acceptedImageTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg'];
    const maxUploadSize = 3000000; //3MB

    if (image.name === null) {
      return;
    }

    if (image.size > maxUploadSize) {
      this.incorrectTypeErrorMessage = "File too big. File should be less than 3MB";
      return;
    }
    if (!acceptedImageTypes.includes(image.type)) {
      this.incorrectTypeErrorMessage = "File type not accepted. Upload an image with [.png, .jpg or .gif] extensions";
      return;
    }

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.showImageBackground(event.target.result)
    }
    reader.readAsDataURL(image);

    this.selectedImage = image;
    this.sendImageToServer()
  }

  private sendImageToServer() {
    let fileToUpload: File = this.selectedImage;

    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this._uploadsService.uploadProductPhoto(formData)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          this.showProgress = true;
        }

        else if (event.type === HttpEventType.Response) {
          this.showProgress = false;
          this.uploadUrlFromServer = event.body as UploadFinishedEventArgs;
        }
      },
        error => {
          this.showProgress = false;
          this.openErrorMessageSnackBar("Error: Could not upload photo.");
        }
      );
  }

  private showImageBackground(ImagePath: string) {
    this.backgroundImg = 'url(' + ImagePath + ')';
  }

  private buildProductForm() {
    this.productForm = this._formBuilder.group({
      Name: ["", Validators.required],
      Description: ["", Validators.required],
      Quantity: ["", Validators.required],
      PhotoUrl: [""],
    });
  }

  get Name() {
    return this.productForm.get('Name')
  }
  get Description() {
    return this.productForm.get('Description')
  }
  get Quantity() {
    return this.productForm.get('Quantity')
  }
  get PhotoUrl() {
    return this.productForm.get('PhotoUrl')
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
