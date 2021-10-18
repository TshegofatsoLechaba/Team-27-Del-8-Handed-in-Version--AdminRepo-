import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { CustomInputValidators } from 'src/app/shared/validators/authentication.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;

  errorMessage = "";
  showLoadingEndicator = false;
  displayProgressSpinner = false;
  submitButtonText = "Create Account";
  submitButtonDiabled = false;

  hidePasswordInput = true;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    formFb: FormBuilder
  ) {
    this.form = formFb.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      ContactNumber: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
    }, { validator: [CustomInputValidators.PasswordMatch, CustomInputValidators.PasswordOptions] })
  }

  get FirstName() {
    return this.form.get('FirstName');
  }
  get LastName() {
    return this.form.get('LastName');
  }
  get Email() {
    return this.form.get('Email');
  }
  get ContactNumber() {
    return this.form.get('ContactNumber');
  }
  get Password() {
    return this.form.get('Password');
  }
  get ConfirmPassword() {
    return this.form.get('ConfirmPassword');
  }

  ngOnInit(): void {
  }

  signUp() {
    this.errorMessage = "";
    if (this.form.valid) {
      this._authService.signUp(this.form.value)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this.showLoadingEndicator = true;
          }
          if (event.type === HttpEventType.Response) {
            this.showLoadingEndicator = false;
            // this.displayProgressSpinner = true;
            localStorage.setItem('token', event.body['token']);
            let returnUrl = this._route
              .snapshot
              .queryParamMap.get('returnUrl');
            this._router.navigate([returnUrl || '/companies/list']);

          }
        },
          error => {
            this.showLoadingEndicator = false;
            this.displayProgressSpinner = false;
            this.errorMessage = error.error.message;
          })
    }
  }

  signIn() {
    this._router.navigate(['/signin']);
  }

}
