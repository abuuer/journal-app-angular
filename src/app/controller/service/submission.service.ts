import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Article} from '../model/article.model';
import {UserArticleDetail} from '../model/user-article-detail.model';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  private baseUrl = 'http://localhost:8080';
  private userArticleDetail = new UserArticleDetail()

  constructor(private http: HttpClient, public tokenStorage: TokenStorageService) { }

  upload(file: File): Observable<HttpEvent<any>> {
    console.log(file);
      const form: FormData = new FormData();
      form.append('file', file);
      console.log(form.getAll('file'));
    const req = new HttpRequest('POST', `${this.baseUrl}/journal-api/file/upload`, form , {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles() {
    return this.http.get(`${this.baseUrl}/journal-api/file/files`)
  }

  setLocalStorage(article : Article): void {
    localStorage.setItem('article',JSON.stringify({article}));
  }

  getLocalStorage(){
    return JSON.parse(localStorage.getItem('article'));
  }

  submitAticle(article: Article) {
    this.userArticleDetail.author = this.tokenStorage.getUser() ;
    article.userArticleDetails.unshift(this.userArticleDetail);
    article.doi = 'doi6'
    article.fileInfos =  [
      { name : 'dffd', url : 'fddf', reference : 'rsds'}
    ]
	  console.log(article)
    this.http.post(this.baseUrl + `/journal-api/article/save`, article).subscribe(
      data => {
        console.log(data)
      }, error => {
        console.log(error)
      }
    )
  }

  getUserArticles(id : number): UserArticleDetail {
    let userArticle = new UserArticleDetail()
    this.http.get<UserArticleDetail>(this.baseUrl + '/journal-api/user-article/id/' + id).subscribe(
      data=>{
        console.log('data : ')
        console.log(data)
        userArticle =  data;
      }, error => {
        console.log(error)
      }
    )
    return userArticle
  }

}
