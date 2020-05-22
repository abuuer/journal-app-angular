import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/journal-api/user/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {
  }

  login(credentials): Observable<any>{
    return this.http.post(this.authUrl + 'signin',{
      email: credentials.email,
      password: credentials.password,
    }, this.httpOptions);
  }

  signup(credentials, passwords): Observable<any>{
    return this.http.post(this.authUrl + 'signup',{
      prefix: credentials.prefix,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      middleName: credentials.middleName,
      email: credentials.email,
      degree: credentials.degree,
      adress: credentials.userAdress,
      country: credentials.country,
      region: credentials.region,
      city: credentials.city,
      postalCode: credentials.postalCode,
      phone: credentials.phone,
      fax: credentials.fax,
      institution: credentials.institution,
      departement: credentials.department,
      instAdress: credentials.instAdress,
      instPhone: credentials.instPhone,
      password: passwords.pwd,
      role: ['author', 'user']
    }, this.httpOptions)
  }
}
