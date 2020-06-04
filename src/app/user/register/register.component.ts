import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors, ValidatorFn,
  Validators
} from '@angular/forms';
import {AuthService} from '../../controller/service/auth.service';
import {Message, MessageService} from 'primeng/api';
import {doesNotMatch} from 'assert';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup
  msgs: Message[] = []
  matcher = new MyErrorStateMatcher()
  progress = false
  gthb = false
  constructor(private _formBuilder: FormBuilder , private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      formArray: new FormArray([
        new FormGroup({
          prefix: new FormControl(),
          firstName: new FormControl('', Validators.required),
          lastName: new FormControl('', Validators.required),
          email: new FormControl('',[Validators.required, Validators.email]),
          emailConf: new FormControl('',[Validators.required]),
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
        },{validators: this.matchEmail}),
        new FormGroup({
          pwd: new FormControl('', Validators.required),
          pwdConf: new FormControl('', Validators.required),
        })
      ])
    });
  }

  // still to be fixed
   matchEmail(group : FormGroup) {
   if(group.get('email').value !== group.get('emailConf').value){
       return { notSame: true }
     }
      return null
  }
  matchPswds(group : FormGroup) {
    if(group.controls.formArray.get([0]).get('email').value !== group.controls.formArray.get([0]).get('emailConf').value){
      return { notSame: true }
    }
    return null
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
    this.msgs = []
    this.progress = true
    this.authService.signup(this.formArray.get([0]).value,this.formArray.get([1]).value).subscribe(
      data => {
        this.progress = false
        this.gthb = true
          this.msgs = []
          this.msgs.push({severity:'success', summary:'registered successfully!'})
      },
      err => {
        if(err.error.message === '-1'){
          this.progress = false
          this.msgs = []
          this.msgs.push({severity:'warn', summary:'Warn Message', detail:'Error: Email is already in use!'})
        }
      }
    );
  }


  showProgressBar() {
    return this.progress
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
