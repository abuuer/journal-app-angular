import { Injectable } from '@angular/core';
import {User} from '../model/user.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user : User ;
  private _currentUser : User ;
  constructor(private route : Router) { }

  get user(): User {
    if(this._user == null) {
      this._user = new User() ;
    }
    return this._user;
  }
  set user(value: User) {
    this._user = value;
  }
  get currentUser(): User {
    if(this._currentUser == null) {
      this._currentUser = new User() ;
    }
    return this._currentUser;
  }
  set currentUser(value: User) {
    this._currentUser = value;
  }


  login(loginForm) {
    this.currentUser.userNamme = this.user.userNamme ;
    console.log(loginForm);
    console.log(this.currentUser);
    this.route.navigate(['home']);
  }

  authenticate() : boolean{
    return !!this.currentUser.userNamme;
  }
}
