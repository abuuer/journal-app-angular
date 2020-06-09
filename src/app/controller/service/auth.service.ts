import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CanActivate, Router} from '@angular/router';
import {User} from "../model/user.model";
import {TokenStorageService} from "./token-storage.service";
import {environment} from "../../../environments/environment";





@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private _roles : string[] = []
  private _currentUser : User
  private authUrl = environment.url;
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
    return this.http.post(this.authUrl + '/journal-api/user/signin',{
      email: credentials.email,
      password: credentials.pwd,
    }, this.httpOptions)
  }

  getUserInfos(email : string){
    return this.http.get<User>(this.authUrl + '/journal-api/user/email/' + email).toPromise().then(
      data=>{ return data}
    )
  }

  signup(credentials): Observable<any>{
    return this.http.post(this.authUrl + '/journal-api/user/signup',{
      pseudo: credentials.prefix,
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
    }, this.httpOptions)
  }


  confirmRegistration(token: string, value: any) {
   return this.http.put(this.authUrl + '/journal-api/user/confirmRegistraion/token/'+token+'/password/'+value,'')
      .toPromise().then(data=>{return data})
  }
}
