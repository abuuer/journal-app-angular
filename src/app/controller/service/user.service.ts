import { Injectable } from '@angular/core';
import {User} from '../model/user.model';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {TokenStorageService} from './token-storage.service';
import {UserArticleDetail} from "../model/user-article-detail.model";
import {Article} from "../model/article.model";

const API_URL = 'http://localhost:8080/journal-api/test/';



@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate{
  private baseUrl = 'http://localhost:8080';
  private _user : User ;
  private _author : User ;
  private _editor : User ;
  constructor(private route : Router, private http: HttpClient,private router: Router,  private authService: AuthService
  ,public tokenStorage: TokenStorageService) { }

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

  canActivate() {
    if (this.tokenStorage.getUser() != null) {
      return true
    }
    else {
      this.router.navigate(['/'])
      return false
    }
  }


}
