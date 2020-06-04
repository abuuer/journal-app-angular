import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng';
import {TokenStorageService} from '../../../controller/service/token-storage.service';
import {SubmissionService} from '../../../controller/service/submission.service';
import {User} from '../../../controller/model/user.model';
import {Article} from '../../../controller/model/article.model';
import {UserArticleDetail} from '../../../controller/model/user-article-detail.model';

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
  userArticleDetails : UserArticleDetail[]
  @ViewChild('dt') table: Table;
  selectedSubmission: any[];

  statuses = [
    {label: 'Published', value: 'qualified'},
    {label: 'Rejected', value: 'unqualified'},
    {label: 'Pending', value: 'negotiation'},
    {label: 'Accepted', value: 'new'},
    {label: 'Being Reviewed', value: 'renewal'},
    {label: 'Reviewed', value: 'proposal'}

  ];
  constructor(private submissionService: SubmissionService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    this.currentUser = this.tokenStorage.getUser()
    this.submissionService.getUserArticles(this.tokenStorage.getUser().id).then(userArticles => {
      this.userArticleDetail = userArticles
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
  get submissionss(): Array<Article> {
    if(this._submissions == null){
      this._submissions = new Array<Article>()
    }
    return this._submissions;
  }
  set submissionss(value: Array<Article>) {
    this._submissions = value;
  }
  get userArticleDetail(): UserArticleDetail {
    if(this._userArticleDetail == null){
      this._userArticleDetail = new UserArticleDetail()
    }
    return this._userArticleDetail;
  }
  set userArticleDetail(value: UserArticleDetail) {
    this._userArticleDetail = value;
  }

  onDateSelect(value) {
    this.table.filter(this.formatDate(value), 'date', 'equals')
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

}

