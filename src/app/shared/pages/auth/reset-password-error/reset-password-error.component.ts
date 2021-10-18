import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-error',
  templateUrl: './reset-password-error.component.html',
  styleUrls: ['./reset-password-error.component.scss']
})
export class ResetPasswordErrorComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  signIn() {
    this._router.navigate(['/signin']);
  }

}


