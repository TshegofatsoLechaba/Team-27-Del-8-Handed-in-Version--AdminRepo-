import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-confirmation',
  templateUrl: './forgot-password-confirmation.component.html',
  styleUrls: ['./forgot-password-confirmation.component.scss']
})
export class ForgotPasswordConfirmationComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }
  signIn() {
    this._router.navigate(['/signin']);
  }

}
