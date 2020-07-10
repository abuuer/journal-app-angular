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
  issueNum = ''
  volNum = ''
  constructor(private userService : UserService,private route : ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(token=>{
      this.issueNum = token.issueNum
      this.volNum = token.volNum
    })
    if(this.issueNum && this.volNum){
      this.userService.findByNumberAndVolumeNumber(this.issueNum, this.volNum).then(data=> {
        this.issue = data
      })
    } else{
       this.userService.findLatestIssue().then(dataSec=> {
         this.issue = dataSec
         this.issueNum = this.issue.number.toString()
       //  this.volNum = this.issue.volume.number.toString()
       })
    }
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

  getpdfLink(article: Article) {
    // tslint:disable-next-line:prefer-for-of
    for(let i = 0 ; i< article.fileInfos.length ; i++){
      if(article.fileInfos[i].type === 'Main Document'){
       return article.fileInfos[i].url
      }
    }
  }

  pdfexist(article: Article) {
    let t = false
    // tslint:disable-next-line:prefer-for-of
    for(let i = 0 ; i< article.fileInfos.length ; i++){
      if(article.fileInfos[i].type === 'Main Document'){
        return article.fileInfos[i].url
        t= true
      }
    }
    return t
  }
}
