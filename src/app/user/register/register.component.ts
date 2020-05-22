import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../../controller/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  formGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      formArray: new FormArray([
        new FormGroup({
          prefix: new FormControl(),
          firstName: new FormControl('', Validators.required),
          lastName: new FormControl('', Validators.required),
          email: new FormControl('',[Validators.required, Validators.email]),
          emailConf: new FormControl('',[Validators.required, Validators.email]),
          institution: new FormControl('',[Validators.required]),
          middleName: new FormControl(),
          degree: new FormControl(),
          userAdress: new FormControl(),
          country: new FormControl(),
          region: new FormControl(),
          city: new FormControl(),
          postalCode: new FormControl(),
          phone: new FormControl(),
          fax: new FormControl(),
          department: new FormControl(),
          instAdress: new FormControl(),
          instPhone: new FormControl(),
        }),
        new FormGroup({
          pwd: new FormControl('', Validators.required),
          pwdConf: new FormControl('', Validators.required),
        })
      ])
    });
  }
 get firstName(): any {
    return this.formArray.get([0]).get('firstName');
  }
  get lastName(): any {
    return this.formArray.get([0]).get('lastName');
  }
  get email(): any {
    return this.formArray.get([0]).get('email');
  }
  get emailConf(): any {
    return this.formArray.get([0]).get('emailConf');
  }
  get institution(): any {
    return this.formArray.get([0]).get('institution');
  }
  get pwd(): any {
    return this.formArray.get([1]).get('pwd');
  }
  get pwdConf(): any {
    return this.formArray.get([1]).get('pwdConf');
  }
  get formArray(): FormArray{
    return this.formGroup.get('formArray') as FormArray;
  }

  onSubmit(){
    this.authService.signup(this.formArray.get([0]).value,this.formArray.get([1]).value).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err.error.message);
      }
    );
  }

}
