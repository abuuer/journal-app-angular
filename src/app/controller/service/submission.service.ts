import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Article} from '../model/article.model';
import {UserArticleDetail} from '../model/user-article-detail.model';
import {TokenStorageService} from './token-storage.service';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService implements CanActivate{

  public baseUrl = environment.url
  private userArticleDetail = new UserArticleDetail()

  constructor(public http: HttpClient, public tokenStorage: TokenStorageService
              ,private router: Router, private authService : AuthService) { }


  upload(file: File, fileType: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/journal-api/file/upload/type/${fileType}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }


  getFiles() {
    return this.http.get(`${this.baseUrl}/journal-api/file/files`)
  }

  setLocalStorage(article : Article): void {
    localStorage.setItem('article-submission',JSON.stringify({article}));
  }

  getLocalStorage(){
    return JSON.parse(localStorage.getItem('article-submission'));
  }

  submitAticle(article: Article) {
	 this.userArticleDetail.user = this.tokenStorage.getUser()
	 if(article.userArticleDetails.length !== 0){
     if(article.userArticleDetails[0].user.email !== this.tokenStorage.getUser().email){
       article.userArticleDetails.unshift(this.userArticleDetail);
     }
   }else {
     article.userArticleDetails[0] = this.userArticleDetail
   }

    const r = Math.random().toString(36).substring(7);
    article.reference = 'ref' + r
    return this.http.post(this.baseUrl + `/journal-api/article/save`, article).toPromise().then(data=>{return data})
  }

  getUserArticles(email){
    return this.http.get<Article[]>(this.baseUrl + '/journal-api/user-article/findAllArticlesByAuthor/email/' + email).toPromise()
      .then(data => { return data; });
  }

  canActivate() {
    if(this.tokenStorage.getRoles() == null){
      this.router.navigate(['/mjt/home'])
      return false
    } else {
      if (this.tokenStorage.getRoles().includes('ROLE_AUTHOR') || this.tokenStorage.getRoles().includes('ROLE_REVIEWER')) {
        return true
      }else {
        this.router.navigate(['/'])
        return false
      }
    }
  }
}
