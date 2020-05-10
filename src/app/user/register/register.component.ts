import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('',[Validators.required, Validators.email]),
      emailConf: new FormControl('',[Validators.required, Validators.email]),
      institution: new FormControl('',[Validators.required]),
    });
    this.secondFormGroup = this._formBuilder.group({
      userName: new FormControl('', Validators.required),
      pwd: new FormControl('', Validators.required),
      pwdConf: new FormControl('', Validators.required),
    });
  }
  get firstName(): any {
    return this.firstFormGroup.get('firstName');
  }
  get lastName(): any {
    return this.firstFormGroup.get('lastName');
  }
  get email(): any {
    return this.firstFormGroup.get('email');
  }
  get emailConf(): any {
    return this.firstFormGroup.get('emailConf');
  }
  get institution(): any {
    return this.firstFormGroup.get('institution');
  }
  get userName(): any {
    return this.secondFormGroup.get('userName');
  }
  get pwd(): any {
    return this.secondFormGroup.get('pwd');
  }
  get pwdConf(): any {
    return this.secondFormGroup.get('pwdConf');
  }
}
