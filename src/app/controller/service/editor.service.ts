import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/user.model';
import {Article} from '../model/article.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorService implements CanActivate{

  private _url = 'http://localhost:8080'
  private httpOptions = {
    headers: new HttpHeaders({ Accept: 'application/json','Content-Type': 'application/json' })
  };
  constructor(private http : HttpClient, private router: Router, private authService : AuthService,
              private tokenStorage: TokenStorageService) { }

  canActivate() {
    if (this.tokenStorage.getRoles().includes('ROLE_EDITOR')) {
      return true
    }
    else {
      this.router.navigate(['/'])
      return false
    }
  }

  getArticles(){
    return this.http.get<any>(this._url + '/journal-api/article/all' ).toPromise()
      .then(data => {
         console.log(data)
        return data; });
  }

  getAllReviewers(){
   return this.http.get<User[]>(this._url + '/journal-api/user-role/findAllReviewers').toPromise().then(
      data=>{
        console.log(data)
        return data
      }
    )
  }

  assignReviewer(id: any, reference: string) {
    return this.http.put(this._url + '/journal-api/article/assignReviewer/articleRef/' + reference +
      '/id/' + id,this.httpOptions)
  }
}
