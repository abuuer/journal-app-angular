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
  private _submissionss : Array<Article>
  private _userArticleDetail : UserArticleDetail
  @ViewChild('dt') table: Table;
  selectedSubmission: any[];
  submissions = [
    {name: 'Title of the paper lkjlkjvlj glkjxlckg jlkcjg kxlcjgkljx klgx', genre: 'paper', reviewer: 'Anouar Abuer',
      date: '2020-05-14', status: {label: 'Reviewed', value: 'qualified'}},
   {name: 'Title of the paper', genre: 'paper', reviewer: 'Anouar Abuer', date: '2020-05-14', status: {label: 'Rejected', value: 'unqualified'},},
   {name: 'Title of the paper', genre: 'paper', reviewer: 'Anouar Abuer', date: '2020-04-14', status: {label: 'Pending', value: 'negotiation'}},
   {name: 'Title of the paper', genre: 'paper', reviewer: 'Anouar Abuer', date: '2020-04-14', status: {label: 'Being Reviewed', value: 'renewal'}},
]
  statuses = [
    {label: 'Reviewed', value: 'qualified'},
    {label: 'Rejected', value: 'unqualified'},
    {label: 'Pending', value: 'negotiation'},
    {label: 'New', value: 'new'},
    {label: 'Being Reviewed', value: 'renewal'},

  ];
  constructor(private submissionService: SubmissionService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    this.currentUser = this.tokenStorage.getUser()
    this.userArticleDetail = this.getUserArticles(this.tokenStorage.getUser().id)
    this.loading = false
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
    if(this._submissionss == null){
      this._submissionss = new Array<Article>()
    }
    return this._submissionss;
  }
  set submissionss(value: Array<Article>) {
    this._submissionss = value;
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

  onRepresentativeChange(event) {
    // tslint:disable-next-line:no-debugger
    debugger;
    this.table.filter(event.value, 'representative', 'in')
  }

  getUserArticles(id : number): UserArticleDetail{
    return this.submissionService.getUserArticles(id)
  }
}

