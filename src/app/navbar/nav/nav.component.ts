import { Component, OnInit } from '@angular/core';
import {UserService} from '../../controller/service/user.service';
import {TokenStorageService} from '../../controller/service/token-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private userService: UserService,private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  editorAuthenticate(){
    return this.userService.editorAuthenticate();
  }
  authenticate(){
    return this.userService.authenticate();
  }
}
