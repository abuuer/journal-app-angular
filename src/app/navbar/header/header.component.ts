import { Component, OnInit } from '@angular/core';
import {UserService} from '../../controller/service/user.service';
import {TokenStorageService} from '../../controller/service/token-storage.service';
import {AuthService} from '../../controller/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService : AuthService,public tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  authenticate(){
    return this.tokenStorage.getUser();
  }

}
