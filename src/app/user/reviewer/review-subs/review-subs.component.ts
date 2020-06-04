import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../../../controller/service/auth.service';
import {Article} from '../../../controller/model/article.model';
import {ReviewerService} from '../../../controller/service/reviewer.service';
import {TokenStorageService} from '../../../controller/service/token-storage.service';

@Component({
  selector: 'app-review-subs',
  templateUrl: './review-subs.component.html',
  styleUrls: ['./review-subs.component.scss']
})
export class ReviewSubsComponent implements OnInit{
  loading = true
  @ViewChild('dt') table: Table;
  statuses = [
    {label: 'Reviewed', value: 'qualified'},
    {label: 'Rejected', value: 'unqualified'},
    {label: 'Pending', value: 'negotiation'},
    {label: 'New', value: 'new'},
    {label: 'Being Reviewed', value: 'renewal'},

  ];
  display = false
  selectedArticle: Article
  private _articles = new Array<Article>()
  constructor(private router: Router, private authService : AuthService
              , private reviewerService : ReviewerService, private tokenStorage : TokenStorageService) { }

  ngOnInit(): void {
   this.reviewerService.getArticles(this.tokenStorage.getUser().id).then(articles => {
      this.articles = articles
      this.loading = false
    })
  }
  get articles(): Article[] {
    return this._articles;
  }
  set articles(value: Article[]) {
    this._articles = value;
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
      if(this.statuses[i].label.toLowerCase() === status.toLowerCase()){
        return this.statuses[i].value
      }
    }
  }

  selected(selectedArticle: Article) {
    return selectedArticle==null ? false : true
  }

  review() {
    this.reviewerService.setLocalStorage(this.selectedArticle)
    this.reviewerService.selectedArticle = this.selectedArticle
  }
}