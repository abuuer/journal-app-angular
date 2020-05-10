import { Component, OnInit } from '@angular/core';
import {UserService} from '../../controller/service/user.service';
import {User} from '../../controller/model/user.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup : FormGroup;
  confirm = false;
  constructor(private userService : UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required,Validators.email]),
      pwd: new FormControl('', Validators.required),
    });
    console.log(this.pwd.hasError('required'));
    console.log(this.email.hasError('required'));
    console.log(this.email.hasError('email'));
  }
  public enable(): boolean {
    return this.pwd.hasError('required') || this.email.hasError('required')
      || this.email.hasError('email');
  }
  c() {
    console.log(this.formGroup.value);
  }
  get email(){
    return this.formGroup.get('email');
  }
  get pwd(){
    return this.formGroup.get('pwd');
  }
  public get user() : User{
    return this.userService.user;
  }
  get editor(): User {
    return this.userService.editor;
  }
  get author(): User {
    return this.userService.author;
  }

  authorLogin(){
    return this.userService.authorLogin();
  }

  editorLogin() {
    return this.userService.editorLogin();
  }
}
