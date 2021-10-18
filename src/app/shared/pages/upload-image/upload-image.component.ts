import { Component, OnInit } from '@angular/core';
import { UploadsService } from 'src/app/@api/uploads/uploads.service';

@Component({
  selector: 'upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  imageUrl: string = "/assets/images/default-upload-image.png";
  fileToUpload: File = null;
  constructor(private _uploadsServices : UploadsService) { }

  ngOnInit() {
  }

  handleFileInput(element: Event) {
    const elementTarget = element.target as HTMLInputElement;
    this.fileToUpload = elementTarget.files.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  OnSubmit(Caption,Image){
  //  this._uploadsServices.uploadImage(Caption.value,this.fileToUpload).subscribe(
  //    data =>{
  //      Caption.value = null;
  //      Image.value = null;
  //      this.imageUrl = "/assets/images/default-upload-image.png";
  //    }
  //  );
  }

}
