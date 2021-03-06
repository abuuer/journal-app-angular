import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {TokenStorageService} from './token-storage.service';
import {Article} from '../model/article.model';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileInfo} from '../model/file.model';
import {environment} from '../../../environments/environment';
import {AbstractControl, FormControl, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ReviewerService implements CanActivate{
  private _selectedArticle = new Article();
  url = environment.url
  constructor(private router: Router, private http : HttpClient, private tokenService: TokenStorageService) { }

  canActivate() {
    if(this.tokenService.getRoles() == null){
      this.router.navigate(['/'])
      return false
    } else {
      if (this.tokenService.getRoles().includes('ROLE_REVIEWER')) {
        return true
      } else {
        this.router.navigate(['/'])
        return false
      }
    }
  }
  get selectedArticle(): Article {
    return this._selectedArticle;
  }
  set selectedArticle(value: Article) {
    this._selectedArticle = value;
  }


  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.url}/journal-api/file/upload/type/review`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getArticles(email) {
    return this.http.get<any>(this.url + '/journal-api/user-article/findAllArticlesByReviewer/email/'+ email)
      .toPromise().then(data =>{
        return data})
  }

  setLocalStorageReview(articleReview : FileInfo): void {
    localStorage.setItem(`final-review${this.getLocalStorage().article.reference}`,JSON.stringify({articleReview}));
  }

  getLocalStorageReview(){
    return JSON.parse(localStorage.getItem(`final-review${this.getLocalStorage().article.reference}`))
  }

  setLocalStorage(article : Article): void {
    localStorage.setItem('article',JSON.stringify({article}))
  }

  getLocalStorage(){
    return JSON.parse(localStorage.getItem('article'));
  }


  submitAticle(finalReview: FileInfo) {
   return  this.http.post(this.url + '/journal-api/file/save', finalReview).toPromise().then(data=>{
      return data;
    })
  }

  submitDecision(finalDecision: any, reference: string, email: string, additionalNotes : string) {
    return this.http.put(this.url + '/journal-api/user-article/updateDecision/email/'+ email +'/articleRef/' + reference +
      '/decision/'+ finalDecision + '/additionalNotes/'+ additionalNotes, '').toPromise().then(data=>{
      return data;
    })
  }
}
