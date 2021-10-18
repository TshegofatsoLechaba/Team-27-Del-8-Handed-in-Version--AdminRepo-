import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@api/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  errorMessage
  showLoadingEndicator = false;

  forgotPasswordForm: FormGroup;

  constructor(forotPasswordFb: FormBuilder, private _authService: AuthService, private _router: Router) {
    this.forgotPasswordForm = forotPasswordFb.group({
      Email: ['', [Validators.required, Validators.email]]
    })
  }

  get Email() {
    return this.forgotPasswordForm.get('Email');
  }



  ngOnInit(): void {
  }

  SendResetEmail() {
    this.errorMessage = "";
    if (this.forgotPasswordForm.valid) {
      // console.log(this.forgotPasswordForm.value.Email);
      this._authService.ForgotPassword(this.forgotPasswordForm.value.Email)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this.showLoadingEndicator = true;
          }
          if (event.type === HttpEventType.Response) {
            this.showLoadingEndicator = false;
            // let returnUrl = this._route.snapshot.queryParamMap.get('returnUrl');
            this._router.navigate(['/forgot-password-confirm']);
          }
        },
          error => {
            this.showLoadingEndicator = false;
            this.errorMessage = error.error.message;
          })
    }

  }


}
