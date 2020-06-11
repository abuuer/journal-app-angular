import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/user.model';
import {Article} from '../model/article.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditorService implements CanActivate {

  private _url = environment.url
  private httpOptions = {
    headers: new HttpHeaders({Accept: 'application/json', 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private router: Router, private authService: AuthService,
              private tokenStorage: TokenStorageService) {
  }

  canActivate() {
    if (this.tokenStorage.getRoles() == null) {
      this.router.navigate(['/home'])
      return false
    } else {
      if (this.tokenStorage.getRoles().includes('ROLE_EDITOR')) {
        return true
      } else {
        this.router.navigate(['/'])
        return false
      }
    }
  }

  getArticles() {
    return this.http.get<any>(this._url + '/journal-api/article/all').toPromise()
      .then(data => {
        return data;
      });
  }

  getAllReviewers() {
    return this.http.get<User[]>(this._url + '/journal-api/user-role/findAllReviewers').toPromise().then(
      data => {
        console.log(data)
        return data
      }
    )
  }

  assignReviewer(email, reference) {
    return this.http.put(this._url + '/journal-api/article/assignReviewer/articleRef/' + reference +
      '/email/' + email, this.httpOptions)
  }

  authorToReviewer(selectedAuthor: User) {
    return this.http.put(this._url + '/journal-api/user/authorToReviewer/email/' + selectedAuthor.email, '').toPromise()
      .then(data => {
        return data
      })
  }

  getAllAuthors() {
    return this.http.get<User[]>(this._url + '/journal-api/user-role/findAllAuthors').toPromise()
      .then(data => {
        console.log(data)
        return data
      })
  }

  deleteReviewer(email: string, reference: string) {
    return this.http.delete(this._url + '/journal-api/user-article/deleteByUserId/email/' + email
      + '/articleRef/'+reference).toPromise()
      .then(data => {
        return data
      })
  }

  deleteAccount(email: string) {
    return this.http.delete(this._url + '/journal-api/user/deleteAccount/email/' + email).toPromise()
      .then(data => {
        return data
      })
  }

  dismissReviewer(email: string) {
    return this.http.delete(this._url +'/journal-api/user/dismissReviewer/email/'+ email).toPromise().then(data=>{return data})
  }

  submitFinalDecision(finalDecision: any, reference: string) {
    return this.http.put(this._url +'/journal-api/article/updateStatus/articleRef/'+ reference +'/status/' + finalDecision, '')
      .toPromise().then(data=>{return data})
  }
}
