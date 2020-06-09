import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../controller/service/user.service';
import {TokenStorageService} from '../../../controller/service/token-storage.service';
import {AuthService} from '../../../controller/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  private _roles : string[] = []
  constructor(private authService : AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.roles = this.tokenStorage.getRoles()
  }

  get roles(): string[] {
    if(this._roles == null){
      this._roles = []
    }
    return this._roles;
  }
  set roles(value: string[]) {
    this._roles = value;
  }


}
