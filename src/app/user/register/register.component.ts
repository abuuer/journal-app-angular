import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  authForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('',[Validators.required, Validators.email]),
      emailConf: new FormControl('',[Validators.required, Validators.email]),
      institution: new FormControl('',[Validators.required]),
    }
  )
  constructor() { }

  ngOnInit(): void {
  }
  get firstName(): any {
    return this.authForm.get('firstName');
  }
  get lastName(): any {
    return this.authForm.get('lastName');
  }
  get email(): any {
    return this.authForm.get('email');
  }
  get emailConf(): any {
    return this.authForm.get('emailConf');
  }
  get institution(): any {
    return this.authForm.get('institution');
  }
}
// tslint:disable-next-line:component-class-suffix
 class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
