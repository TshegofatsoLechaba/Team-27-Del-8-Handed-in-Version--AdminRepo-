import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { CustomInputValidators } from 'src/app/shared/validators/authentication.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;

  errorMessage = "";
  showLoadingEndicator = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService,
    formFb: FormBuilder

  ) {
    this.form = formFb.group({
      Token: [''],
      Email: [''],
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]]
    },
    { validators: CustomInputValidators.PasswordMatch })
  }

  get Token() {
    return this.form.get('Token');
  }
  get Email() {
    return this.form.get('Email');
  }
  get Password() {
    return this.form.get('Password');
  }
  get ConfirmPassword() {
    return this.form.get('ConfirmPassword');
  }

  ngOnInit(): void {
    let emailFromQuery = this._route.snapshot.queryParamMap.get('email');
    let tokenFromQuery = this._route.snapshot.queryParamMap.get('token');
    this.form.controls['Token'].setValue(tokenFromQuery);
    this.form.controls['Email'].setValue(emailFromQuery);
  }

  ResetPassword() {
    this.errorMessage = "";
    if (this.form.valid) {

      // console.log(this.form.value);
      this._authService.ResetPassword(this.form.value)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this.showLoadingEndicator = true;
          }
          if (event.type === HttpEventType.Response) {
            this.showLoadingEndicator = false;
            this._router.navigate(['/reset-password-confirm']);
          }
        },
          error => {
            this.showLoadingEndicator = false;
            this.errorMessage = error.error.message;
          })

    }
  }
}
