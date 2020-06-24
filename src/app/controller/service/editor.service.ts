import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/user.model';
import {Article} from '../model/article.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Volume} from '../model/volume.model';
import {Issue} from '../model/issue.model';
import {UserArticleDetail} from "../model/user-article-detail.model";

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

  addToIssue(reference: string, issueNumber: number, volNumber: number) {
    return this.http.put(this._url +'/journal-api/article/addToIssue/articleRef/'+ reference
      + '/issueNumber/' + issueNumber + '/volNumber/'+ volNumber, '').toPromise().then(data=>{return data})
  }

  findByStatus() {
    return this.http.get<Article[]>(this._url +'/journal-api/article/findByStatus/status/Accepted').toPromise().then(
      data=>{return data}
    )
  }

  findAllVolumes() {
    return this.http.get<Volume[]>(this._url +'/journal-api/volume/findAll').toPromise().then(data=>{return data})
  }

  findAllIssues() {
    return this.http.get<Issue[]>(this._url +'/journal-api/issue/findAll').toPromise().then(data=>{return data})
  }

  findByVolumeNumber(vnumber: number) {
    return this.http.get<Issue[]>(this._url +'/journal-api/issue/findByVolume_Number/volumeNumber/'+vnumber)
      .toPromise().then(data=>{return data})
  }

  createNewIssue(issue: Issue) {
	  console.log(issue)
    return this.http.post(this._url +'/journal-api/issue/createNewIssue',{
		number : issue.number,
        startMonth : issue.startMonth,
        endMonth : issue.endMonth,
        issn : issue.issn,
        volume : issue.volume,
        fileInfos : issue.fileInfos
	})
      .toPromise().then(data=>{return data})


	  }

  findByIssueNumber() {

  }

  addVolume(volume: Volume) {
    return this.http.post(this._url+'/journal-api/volume/save',{
      number : volume.number,
      year : volume.year
    }).toPromise().then(data=>{return data})
  }

  deleteArticle(article: Article) {
    return this.http.put(this._url+'/journal-api/article/deleteArticleFromIssue/articleRef/'+article.reference,'')
      .toPromise().then(data=>{return data})
  }

  publishIssue(issNumber: number,volNumber: number) {
    return this.http.put(this._url+'/journal-api/issue/publishIssue/issNumber/'+issNumber +'/volNumber/'+volNumber,'')
      .toPromise().then(data=>{return data})
  }
}
