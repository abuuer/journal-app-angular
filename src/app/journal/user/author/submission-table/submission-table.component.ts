import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng';
import {TokenStorageService} from '../../../../controller/service/token-storage.service';
import {SubmissionService} from '../../../../controller/service/submission.service';
import {User} from '../../../../controller/model/user.model';
import {Article} from '../../../../controller/model/article.model';
import {UserArticleDetail} from '../../../../controller/model/user-article-detail.model';

@Component({
  selector: 'app-submission-details',
  templateUrl: './submission-table.component.html',
  styleUrls: ['./submission-table.component.scss']
})
export class SubmissionTableComponent implements OnInit {
  loading = true;
  private _currentUser : User;
  private _submissions : Array<Article>
  private _userArticleDetail : UserArticleDetail
  private _articles  = new Array<Article>()
  @ViewChild('dt') table: Table;
  selectedArticle : Article

  statuses = [
    {label: 'Published', value: 'qualified'},
    {label: 'Rejected', value: 'unqualified'},
    {label: 'Accepted', value: 'new'},
    {label: 'Being Reviewed', value: 'renewal'},
    {label: 'Reviewed', value: 'proposal'},
    {label: 'new', value: 'negotiation'}
  ]

  constructor(private submissionService: SubmissionService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    this.currentUser = this.tokenStorage.getUser()
    this.submissionService.getUserArticles(this.tokenStorage.getUser().email).then(articles => {
      this.articles = articles
      this.loading = false
    })
  };

  get currentUser(): User {
    if(this._currentUser == null){
      this._currentUser = new User()
    }
    return this._currentUser;
  }
  set currentUser(value: User) {
    this._currentUser = value;
  }
  get articles(): Array<Article> {
    if(this._articles == null){
      this._articles = new Array<Article>()
    }
    return this._articles;
  }
  set articles(value: Array<Article>) {
    this._articles = value;
  }

  onDateSelect(value) {
    this.table.filter(this.formatDate(value), 'submitDate', 'equals')
  }
  formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }


  getValueStatus(status: string) {
    // tslint:disable-next-line:prefer-for-of
    for(let i = 0 ; i < this.statuses.length ; i++){
      // tslint:disable-next-line:no-conditional-assignment
      if(this.statuses[i].label === status){
        return this.statuses[i].value
      }
    }
  }
  getLabelStatus(value: string) {
    // tslint:disable-next-line:prefer-for-of
    for(let i = 0 ; i < this.statuses.length ; i++){
      // tslint:disable-next-line:no-conditional-assignment
      if(this.statuses[i].value.toLowerCase() === value.toLowerCase()){
        return this.statuses[i].label
      }
    }
  }
  fiterStatus(value: any) {
    if(value !== null){
      this.table.filter(this.getLabelStatus(value),'status','equals')
    } else {
      this.table.filter('','status','equals')
    }
  }
}

