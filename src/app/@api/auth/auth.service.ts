import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CurrentUser } from './auth.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpointBase = environment.endpointBase;

  constructor(
    private _httpClient: HttpClient,
    private _router: Router
  ) { }

  // get currentUser() {
  //   let token = localStorage.getItem('token');
  //   if (!token) return null;

  //   const helper = new JwtHelperService();
  //   return helper.decodeToken(token) as CurrentUser;
  // }

  isSignedIn() {
    // let token = localStorage.getItem('token');
    // if (!token) return false;

    // const helper = new JwtHelperService();
    // if (helper.isTokenExpired(token)) return false;

    return true;
  }

  signOut() {
    localStorage.removeItem('token');
    this._router.navigate(['']);
  }


  signIn(payload: any) {
    return this._httpClient
      .post(this.endpointBase.concat("Account/SignIn"), payload, { reportProgress: true, observe: 'events' });
  }

  signUp(payload: any) {
    return this._httpClient.post(this.endpointBase.concat("Account/SignUp"), payload, { reportProgress: true, observe: 'events' });
  }

  ForgotPassword(email: string) {
    return this._httpClient.get(this.endpointBase.concat("Account/ForgotPassword/") + email, { reportProgress: true, observe: 'events' });
  }

  ResetPassword(payload: any) {
    return this._httpClient.post(this.endpointBase.concat("Account/ResetPassword"), payload, { reportProgress: true, observe: 'events' });
  }
}
