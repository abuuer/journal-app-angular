import { Injectable } from '@angular/core';
import {User} from '../model/user.model';
import {CanActivate, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {TokenStorageService} from './token-storage.service';
import {environment} from '../../../environments/environment';
import {Article} from '../model/article.model';
import {Volume} from '../model/volume.model';
import {Issue} from '../model/issue.model';

const API_URL = 'http://localhost:8080/journal-api/test/';



@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate{
  private _url = environment.url
  private _user : User ;
  private _author : User ;
  private _editor : User ;
  private _article : Article
  private _issue : Issue
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
  get issue(): Issue {
    if(this._issue == null){
      this._issue = new Issue()
    }
    return this._issue;
  }
  set issue(value: Issue) {
    this._issue = value;
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
  get article(): Article {
    if(this._article == null) {
      this._article = new Article() ;
    }
    return this._article;
  }

  set article(value: Article) {
    this._article = value;
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

  findAllPublishedVolumes() {
    return this.http.get<Volume[]>(this._url +'/journal-api/volume/findAllPublished').toPromise().then(data=>{return data})
  }

  findByNumberAndVolumeNumber(issueNum: string, volNum: string) {
    return this.http.get<Issue>(this._url +'/journal-api/issue/findByNumberAndVolume' +
      '/issNumber/'+ issueNum+'/volNumber/'+ volNum).toPromise().then(data=>{return data})
  }

  findLatestIssue(){
    return this.http.get<Issue>(this._url +'/journal-api/issue/findLatestIssue').toPromise().then(data=>{
      this.issue = data
      return data})
  }

  findMostRead() {
    return this.http.get<Article>(this._url +'/journal-api/published/findMostRead').toPromise().then(data=>{
      return data})
  }
}
