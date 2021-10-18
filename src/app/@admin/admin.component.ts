import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../@api/auth/auth.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  displayName: string = "";

  constructor(
    private _location: Location,
    private _router: Router,
    private _authService: AuthService
  ) {
    this.displayName = "Tshegofatso";
  }

  ngOnInit(): void {
  }

  onNavigateToProductCategories() {
    this._router.navigate(['product-categories/list']);

  }

  onNavigateToAllProducts() {
    this._router.navigate(['products/list']);
  }

  onSignOut() {
    this._authService.signOut();
  }

  onNavigateBack() {
    if (this._authService.isSignedIn()) {
      this._location.back();
    }
  }
}
