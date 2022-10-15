import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  // Validates that no fields are left blank in register.
  validateRegister(user){
    if(user.username == '' || user.email == '' || user.password == '') {
      return false;
    } else {
      return true;
    }
  }

  // Uses regex expression to validate email address.
  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
