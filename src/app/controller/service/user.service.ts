import { Injectable } from '@angular/core';
import {User} from '../model/user.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user : User ;
  private _author : User ;
  private _editor : User ;
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
  get editor(): User {
    if(this._editor == null) {
      this._editor = new User() ;
    }
    return this._editor;
  }
  set editor(value: User) {
    this._editor = value;
  }
  get author(): User {
    if(this._author == null) {
      this._author = new User() ;
    }
    return this._author;
  }
  set author(value: User) {
    this._author = value;
  }


  authorLogin() {
    this.user.email = this.author.email ;
    console.log(this.user);
    console.log(this.author);
    this.route.navigate(['home']);
  }

  authenticate() : boolean{
    return !!this.user.email;
  }
  editorAuthenticate() : boolean{
    return !!(this.user.email && this.editor.email);
  }

  editorLogin() {
    this.user.email = this.editor.email ;
    this.route.navigate(['home']);
  }
}
