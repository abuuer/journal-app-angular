import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CanActivate, Router} from '@angular/router';
import {User} from "../model/user.model";
import {TokenStorageService} from "./token-storage.service";





@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private _roles : string[] = []
  private _currentUser : User
  private authUrl = 'http://localhost:8080/journal-api/user/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  }


  get roles(): string[] {
    return this._roles;
  }
  set roles(value: string[]) {
    this._roles = value;
  }
  set currentUser(value: User) {
    this._currentUser = value;
  }
  get currentUser(): User {
    if(this._currentUser == null){
      this._currentUser = new User()
    }
    return this._currentUser;
  }

  login(credentials): Observable<any>{
    return this.http.post(this.authUrl + 'signin',{
      email: credentials.email,
      password: credentials.password,
    }, this.httpOptions)
    console.log(this.httpOptions)
  }

  getUserInfos(email : string){
    this.http.get<User>(this.authUrl + 'email/' + email).subscribe(
      data => {
        this.tokenStorage.saveUser(data)
      }, error => {
        console.log(error)
      }
    )
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
