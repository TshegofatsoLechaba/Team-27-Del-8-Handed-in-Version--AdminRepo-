import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@api/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  submitButtonText = "Sign In";
  submitButtonDiabled = false;
  displayProgressSpinner = false;


  get UserName() {
    return this.loginForm.get('UserName');
  }
  get Password() {
    return this.loginForm.get('Password');
  }

  errorMessage = "";
  showLoadingEndicator = false;
  constructor(
    private _authService: AuthService,
    // private _mixpanelService: MixpanelService,

    private _router: Router,
    private _route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    loginFb: FormBuilder
  ) {
    this.loginForm = loginFb.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.spinner.hide();
  }

  signIn() {
    this.errorMessage = "";
    if (this.loginForm.valid) {
      this._authService.signIn(this.loginForm.value)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this.showLoadingEndicator = true;
          }
          if (event.type === HttpEventType.Response) {
            this.showLoadingEndicator = false;
            this.submitButtonText = "Please wait";
            this.submitButtonDiabled = true;
            this.spinner.show();
            localStorage.setItem('token', event.body['token']);
            let returnUrl = this._route.snapshot.queryParamMap.get('returnUrl');
            this._router.navigate([returnUrl || '/companies/list']);
            // this._mixpanelService.signin();
          }

        },
          error => {
            this.showLoadingEndicator = false;
            this.spinner.hide();
            this.submitButtonDiabled = false;
            this.errorMessage = error.error.message;
          })
    }

  }
  createAccount() {
    this._router.navigate(['/signup']);
  }

  forgotPassword() {
    this._router.navigate(['/forgot-password']);
  }
}


