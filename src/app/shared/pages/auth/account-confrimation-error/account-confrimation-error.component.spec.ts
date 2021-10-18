import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountConfrimationErrorComponent } from './account-confrimation-error.component';

describe('AccountConfrimationErrorComponent', () => {
  let component: AccountConfrimationErrorComponent;
  let fixture: ComponentFixture<AccountConfrimationErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountConfrimationErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountConfrimationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
