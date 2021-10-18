import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  endpointBase = environment.endpointBase;

  constructor(
    private _httpClient: HttpClient,
    private _router: Router
  ) { }



  uploadProductPhoto(payload) {
    return this._httpClient.post(this.endpointBase.concat("Uploads/Products/Photos/Upload"),
      payload, { reportProgress: true, observe: 'events' });
  }

  downloadProductPhoto(productId: string) {
    return this._httpClient.get(
      this.endpointBase.concat("Uploads/Products/Photos/Download/" + productId),
      { responseType: 'blob', observe: 'response' }
    );
  }

}
