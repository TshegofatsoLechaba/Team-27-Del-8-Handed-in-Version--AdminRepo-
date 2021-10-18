import { AbstractControl } from '@angular/forms';



export class CustomInputValidators {

  static PasswordMatch(control: AbstractControl) {
    let password = control.get('Password').value as AbstractControl;
    let confirmPassword = control.get('ConfirmPassword').value;

    if (password != confirmPassword) control.get('ConfirmPassword').setErrors({ ConfirmPassword: true });
    else {
      return null;
    }
  }

  static PasswordOptions(control: AbstractControl) {
    let password = control.get('Password').value as string;

    if (password.search(/[#?!@$%^&*-]/) == -1) control.get('Password').setErrors({ RequireNonAlphanumeric: true });
    if (password.search(/[A-Z]/) == -1) control.get('Password').setErrors({ RequireUppercase: true });
    if (password.search(/[a-z]/) == -1) control.get('Password').setErrors({ RequireLowercase: true });
    if (password.search(/[?=.*?[0-9]/) == -1) control.get('Password').setErrors({ RequireDigit: true });
    if (password.length < 6) control.get('Password').setErrors({ RequiredLength: true });

    else {
      return null;
    }
  }

  static ContactNumberOptions(control: AbstractControl) {
    // let contactNumber = control.get('ContactNumber').value as string;
    let controlCtrl = control.get('formArray').get([0]).get('CellPhoneNumber');
    let controlValue = controlCtrl.value as string;

    if (controlValue.length != 10) controlCtrl.setErrors({ RequiredLength: true });
    if (controlValue.match(/[A-Z]/))controlCtrl.setErrors({ HasUppercase: true });
    if (controlValue.match(/[a-z]/)) controlCtrl.setErrors({ HasLowercase: true });
    if (controlValue.match(/[^a-zA-Z\d\s:]/)) controlCtrl.setErrors({ HasNonAlphanumeric: true });

    else {
      return null;
    }
  }


}
