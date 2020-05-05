import { Component, OnInit } from '@angular/core';
import {UserService} from '../../controller/service/user.service';
import {User} from '../../controller/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userService : UserService) { }

  ngOnInit(): void {
  }

  public get user() : User{
    return this.userService.user;
  }

  login(loginForm){
    return this.userService.login(loginForm);
  }

}
