import { Component, OnInit } from '@angular/core';
import {UserService} from '../../controller/service/user.service';
import {User} from '../../controller/model/user.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  status : string ;
  value: boolean;
  constructor(private userService : UserService) { }

  ngOnInit(): void {
  }
  public get currentUser(): User {
    return this.userService.currentUser;
  }
  changeValue(value){
    this.status = value ;
  }
}
