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

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = !!(form && form.submitted);
    const controlTouched = !!(control && (control.dirty || control.touched));
    const controlInvalid = !!(control && control.invalid);
    const parentInvalid = !!(control && control.parent && control.parent.invalid && (control.parent.dirty || control.parent.touched));

    return isSubmitted || (controlTouched && (controlInvalid || parentInvalid));
  }
}

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
  done = false
  constructor(private _formBuilder: FormBuilder , private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
          prefix: new FormControl(),
          firstName: new FormControl('', Validators.required),
          lastName: new FormControl('', Validators.required),
          email: new FormControl('',[Validators.required, Validators.email ]),
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
        }, {  validator: this.matchEmail});
  }

  // still to be fixed
  matchEmail(group : FormGroup) {
    const email = group.get( 'email' );
    const emailConf = group.get( 'emailConf');
    return email.value === emailConf.value ? null : {nomatch: true};
  }
 get firstName(): any {
    return this.formGroup.get('firstName');
  }
  get lastName(): any {
    return this.formGroup.get('lastName');
  }
  get email(): any {
    return this.formGroup.get('email');
  }
  get emailConf(): any {
    return this.formGroup.get('emailConf');
  }
  get institution(): any {
    return this.formGroup.get('institution');
  }
  public enable(): boolean {
    return this.firstName.hasError('required') || this.lastName.hasError('required')
      || this.email.hasError('required') || this.email.hasError('required')
      || this.emailConf.hasError('email') || this.institution.hasError('email')
      || this.emailConf.hasError('nomatch')
  }
  onSubmit(){
    if(!this.enable()){
      this.msgs = []
      this.progress = true
      this.authService.signup(this.formGroup.value).subscribe(
        data => {
          this.done = true
          this.progress = false
          this.msgs = []
          this.msgs.push({severity:'success', summary:'registered successfully!'})
          this.done = true
        },
        err => {
          this.progress = false
          if(err.error.message === '-1'){
            this.progress = false
            this.msgs = []
            this.msgs.push({severity:'warn', summary:'Warn Message', detail:'Error: Email is already in use!'})
          }
        }
      );
    }
  }


  showProgressBar() {
    return this.progress
  }


  goBack() {
    this.done = false
  }
}

