import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from "../../controller/service/auth.service";

@Component({
  selector: 'app-register-conf',
  templateUrl: './register-conf.component.html',
  styleUrls: ['./register-conf.component.css']
})

export class RegisterConfComponent implements OnInit {
  formGroup : FormGroup
  matcher = new MyErrorStateMatcher()
  hide = true;
  progress = false
  token : string
  constructor(private formBuilder: FormBuilder, private route : ActivatedRoute, private authService : AuthService) {
    this.route.queryParams.subscribe(token=> {
      this.token = token.token
    })
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      pwd: new FormControl('', [Validators.required]),
      pwdConf: new FormControl('', Validators.required),
    }, { validator:[this.passwordConf, this.passwordReg]});
  }

  passwordConf(group : FormGroup) {
    const pwd = group.get( 'pwd' );
    const pwdConf = group.get( 'pwdConf');
    return pwd.value === pwdConf.value ? null : {nomatch: true};
  }
  passwordReg(group : FormGroup) {
    const reg : RegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
    const pwd = group.get( 'pwd' );
    console.log(pwd.value)
    return reg.test(pwd.value) ? null : {passwordReg: true};
  }

  get pwd(){
    return this.formGroup.get('pwd');
  }
  get pwdConf(){
    return this.formGroup.get('pwdConf');
  }

  showProgressBar() {
    return this.progress
  }

  public enable(): boolean {
    return this.pwd.hasError('required') || this.formGroup.hasError('nomatch')
    || this.formGroup.hasError('nomatch')
  }

  submit() {
    this.progress = true
    if(!this.enable()){
      this.authService.confirmRegistration(this.token,this.formGroup.get('pwd').value).then(
        data=> {
          this.progress = true
          window.location.href = 'login'
        }, error=> {
          this.progress = false
        }
      )
    }
  }
}

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = !!(form && form.submitted);
    const controlTouched = !!(control && (control.dirty || control.touched));
    const controlInvalid = !!(control && control.invalid);
    const parentInvalid = !!(control && control.parent && control.parent.invalid && (control.parent.dirty || control.parent.touched));

    return isSubmitted || (controlTouched && (controlInvalid || parentInvalid));
  }
}
const regExps: { [key: string]: RegExp } = {
  password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
};
