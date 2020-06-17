import { Component, OnInit } from '@angular/core';
import {UserService} from '../../controller/service/user.service';
import {User} from '../../controller/model/user.model';
import {Article} from '../../controller/model/article.model';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  private _article : Article
  constructor(private userService : UserService) {
  }

  ngOnInit(): void {
    if(this.userService.article.userArticleDetails.length !== 0){
      this.article = this.userService.article
    }
  }
  get article(): Article {
    if(this._article == null){
      this._article = new Article()
    }
    return this._article;
  }

  set article(value: Article) {
    this._article = value;
  }

}
