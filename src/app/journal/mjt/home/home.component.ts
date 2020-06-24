import { Component, OnInit } from '@angular/core';
import {SwiperOptions} from 'swiper';
import {Issue} from '../../../controller/model/issue.model';
import {UserService} from '../../../controller/service/user.service';
import {Article} from '../../../controller/model/article.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _latestIssue : Issue
  private _mReadIssues : Issue
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.findLatestIssue()
    this.latestIssue = this.userService.issue
    this.mReadIssues =
      { number : 1,
        publishDate: new Date('2020-01-01'), status:'published',startMonth: 'Jan',endMonth: 'Feb',issn:'562-56',
        articles:[
          {title : '54512 AAAAAAAA  AAAAAAAAAAAAA 5421 AAAAAAAAAAAAAAAAA 2145',
            // @ts-ignore
            userArticleDetails : [{user:{lastName:'Abouerraja'}},{user:{lastName:'Sfrouisd'}}]
          },
          {title : 'HHHHH BBBBBBBBBBBBB 845454 BBBBBBBBBBBBBBB BBBBBBBBBBBBBBBB',
            // @ts-ignore
            userArticleDetails : [{user:{lastName:'Halima'}},{user:{lastName:'khlidfs'}}]
          },
        ],
        // @ts-ignore
        volume: {number: 1}
      }
  }

  get latestIssue(): Issue {
    if(this._latestIssue == null){
      this._latestIssue = new Issue()
    }
    return this._latestIssue;
  }
  set latestIssue(value: Issue) {
    this._latestIssue = value;
  }
  get mReadIssues(): Issue {
    if(this._mReadIssues == null){
      this._mReadIssues = new Issue()
    }
    return this._mReadIssues;
  }
  set mReadIssues(value: Issue) {
    this._mReadIssues = value;
  }

  setArticle(a: Article) {
    this.userService.article = a
  }
}
