import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Article} from '../model/article.model';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

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
    return this.http.get(`${this.baseUrl}/journal-api/file/files`);;
  }

  setLocalStorage(article : Article): void {
    localStorage.setItem('article',JSON.stringify({article}));
  }

  getLocalStorage(){
    return JSON.parse(localStorage.getItem('article'));
  }

}
