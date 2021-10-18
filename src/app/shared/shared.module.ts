import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxSpinnerModule } from "ngx-spinner";
import { MaterialModule } from "../@material/material.module";

import { AppOverlayModule } from "./loaders/Overlay/Overlay.module";
import { ProgressSpinnerComponent } from "./loaders/progress-spinner/progress-spinner.component";
import { AccountConfirmedComponent } from "./pages/auth/account-confirmed/account-confirmed.component";
import { AccountConfrimationErrorComponent } from "./pages/auth/account-confrimation-error/account-confrimation-error.component";
import { ForgotPasswordConfirmationComponent } from "./pages/auth/forgot-password-confirmation/forgot-password-confirmation.component";
import { ForgotPasswordComponent } from "./pages/auth/forgot-password/forgot-password.component";
import { ResetPasswordConfirmationComponent } from "./pages/auth/reset-password-confirmation/reset-password-confirmation.component";
import { ResetPasswordErrorComponent } from "./pages/auth/reset-password-error/reset-password-error.component";
import { ResetPasswordComponent } from "./pages/auth/reset-password/reset-password.component";
import { SigninComponent } from "./pages/auth/signin/signin.component";
import { SignupComponent } from "./pages/auth/signup/signup.component";
import { PageNotFoundErrorComponent } from "./pages/re-usables/error-handling/page-not-found-error/page-not-found-error.component";
import { ReportErrorPopUpComponent } from "./pages/re-usables/error-handling/report-error-pop-up/report-error-pop-up.component";
import { UploadImageComponent } from './pages/upload-image/upload-image.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppOverlayModule,
    NgxSpinnerModule,

  ],
  declarations: [
    SignupComponent,
    SigninComponent,
    AccountConfrimationErrorComponent,
    AccountConfirmedComponent,
    ForgotPasswordComponent,
    ForgotPasswordConfirmationComponent,
    ResetPasswordComponent,
    ResetPasswordConfirmationComponent,
    ResetPasswordErrorComponent,
    PageNotFoundErrorComponent,
    ReportErrorPopUpComponent,
    ProgressSpinnerComponent,
    UploadImageComponent,


  ],
  entryComponents: [

  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    OverlayModule,
    NgxSpinnerModule,
    AppOverlayModule,


    ProgressSpinnerComponent,
    SignupComponent,
    SigninComponent,
    AccountConfrimationErrorComponent,
    AccountConfirmedComponent,
    ForgotPasswordComponent,
    ForgotPasswordConfirmationComponent,
    ResetPasswordComponent,
    ResetPasswordConfirmationComponent,
    ResetPasswordErrorComponent,
    PageNotFoundErrorComponent,
    ReportErrorPopUpComponent,

    UploadImageComponent


  ]
})
export class SharedModule { }
