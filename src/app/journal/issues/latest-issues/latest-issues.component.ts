import {Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {Volume} from '../../../controller/model/volume.model';
import {Issue} from '../../../controller/model/issue.model';
import {UserService} from '../../../controller/service/user.service';
import {Article} from '../../../controller/model/article.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './latest-issues.component.html',
  styleUrls: ['./latest-issues.component.css']
})

export class LatestIssuesComponent implements OnInit {
  private _issue : Issue
  issueNum : string
  volNum : string
  constructor(private userService : UserService,private route : ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(token=> {
      this.issueNum = token.issue,
      this.volNum = token.volume
    })
    // this.userService.findByNumberAndVolumeNumber(this.issueNum, this.volNum)
   /* if(issueNum or volNum){
      find by number
    }else {
      latest
    }*/
    this.issue = this.userService.issue
  }

  get issue(): Issue {
    if(this._issue == null){
      this._issue = new Issue()
    }
    return this._issue;
  }
  set issue(value: Issue) {
    this._issue = value;
  }

  setArticle(a: Article) {
    this.userService.article = a
  }
}
