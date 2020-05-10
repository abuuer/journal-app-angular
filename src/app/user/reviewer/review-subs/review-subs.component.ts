import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng';

@Component({
  selector: 'app-review-subs',
  templateUrl: './review-subs.component.html',
  styleUrls: ['./review-subs.component.scss']
})
export class ReviewSubsComponent implements OnInit {
  loading = true;
  @ViewChild('dt') table: Table;
  selectedSubmission: any[];
  submissions = [
    {name: 'Title of the paper lkjlkjvlj glkjxlckg jlkcjg kxlcjgkljx klgx', genre: 'paper', reviewer: 'Anouar Abuer',
      date: '2020-05-14', status: {label: 'Reviewed', value: 'qualified'}},
    {name: 'Title of the paper', genre: 'paper', reviewer: 'Anouar Abuer', date: '2020-05-14', status: {label: 'Rejected', value: 'unqualified'},},
    {name: 'Title of the paper', genre: 'paper', reviewer: 'Anouar Abuer', date: '2020-04-14', status: {label: 'New', value: 'new'}},
    {name: 'Title of the paper', genre: 'paper', reviewer: 'Anouar Abuer', date: '2020-04-14', status: {label: 'Being Reviewed', value: 'renewal'}},
  ]
  statuses = [
    {label: 'Reviewed', value: 'qualified'},
    {label: 'Rejected', value: 'unqualified'},
    {label: 'Pending', value: 'negotiation'},
    {label: 'New', value: 'new'},
    {label: 'Being Reviewed', value: 'renewal'},

  ];
  display = false ;
  constructor() { }

  ngOnInit(): void {
    this.loading = false;
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

  showDialog() {
    this.display = true ;
  }
}
