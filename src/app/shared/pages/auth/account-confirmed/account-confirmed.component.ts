import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-confirmed',
  templateUrl: './account-confirmed.component.html',
  styleUrls: ['./account-confirmed.component.scss']
})
export class AccountConfirmedComponent implements OnInit {
  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  signIn() {
    this._router.navigate(['/signin']);
  }

}
