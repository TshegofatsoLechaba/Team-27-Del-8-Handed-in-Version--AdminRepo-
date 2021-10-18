import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountConfirmedComponent } from './shared/pages/auth/account-confirmed/account-confirmed.component';
import { AccountConfrimationErrorComponent } from './shared/pages/auth/account-confrimation-error/account-confrimation-error.component';
import { ForgotPasswordConfirmationComponent } from './shared/pages/auth/forgot-password-confirmation/forgot-password-confirmation.component';
import { ForgotPasswordComponent } from './shared/pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordConfirmationComponent } from './shared/pages/auth/reset-password-confirmation/reset-password-confirmation.component';
import { ResetPasswordErrorComponent } from './shared/pages/auth/reset-password-error/reset-password-error.component';
import { ResetPasswordComponent } from './shared/pages/auth/reset-password/reset-password.component';
import { SigninComponent } from './shared/pages/auth/signin/signin.component';
import { SignupComponent } from './shared/pages/auth/signup/signup.component';
import { PageNotFoundErrorComponent } from './shared/pages/re-usables/error-handling/page-not-found-error/page-not-found-error.component';

const routes: Routes = [
  { path: 'page-not-found', component: PageNotFoundErrorComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'confirmation-error', component: AccountConfrimationErrorComponent },
  { path: 'forgot-password-confirm', component: ForgotPasswordConfirmationComponent },
  { path: 'confirmed', component: AccountConfirmedComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password-error', component: ResetPasswordErrorComponent },
  { path: 'reset-password-confirm', component: ResetPasswordConfirmationComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  // { path: '', component: SigninComponent },

  { path: '', loadChildren: () => import('./@admin/admin.module').then(m => m.AdminModule) },

  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
