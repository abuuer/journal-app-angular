import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Article} from '../model/article.model';
import {UserArticleDetail} from '../model/user-article-detail.model';
import {TokenStorageService} from './token-storage.service';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService implements CanActivate{

  public baseUrl = 'http://localhost:8080';
  private userArticleDetail = new UserArticleDetail()

  constructor(public http: HttpClient, public tokenStorage: TokenStorageService
              ,private router: Router, private authService : AuthService) { }


  upload(file: File, fileType: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/journal-api/file/upload/type/fileType`, formData, {
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
    this.userArticleDetail.user = this.tokenStorage.getUser() ;
    article.userArticleDetails.unshift(this.userArticleDetail);
    const r = Math.random().toString(36).substring(7);
    article.reference = 'ref' + r
	  console.log(article)
    this.http.post(this.baseUrl + `/journal-api/article/save`, article).subscribe(
      data => {
        console.log(data)
      }, error => {
        console.log(error)
      }
    )
  }

  getUserArticles(id : number){
    return this.http.get<UserArticleDetail>(this.baseUrl + '/journal-api/user-article/id/' + id).toPromise()
      .then(data => { return data; });
  }

  canActivate() {
    if (this.tokenStorage.getRoles().includes('ROLE_AUTHOR')) {
      return true
    }
    else {
      this.router.navigate(['/home'])
      return false
    }
  }
}
