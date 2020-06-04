import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token'
const USER_KEY = 'auth-user'
const ROLE_KEY = 'auth-role'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)
  }

  public saveToken(token: string){
    window.sessionStorage.removeItem(TOKEN_KEY)
    window.sessionStorage.setItem(TOKEN_KEY, token)
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  public getUser(){
    return JSON.parse(sessionStorage.getItem(USER_KEY))
  }
  public saveRoles(roles) {
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, JSON.stringify(roles))
  }

  public getRoles(){
    return JSON.parse(sessionStorage.getItem(ROLE_KEY))
  }

  public logOut(){
    window.location.href = 'home'
    window.sessionStorage.clear()
  }
  reloadPage() {
    window.location.reload()
  }
}
