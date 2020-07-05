import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, Table} from 'primeng';
import {User} from '../../../../controller/model/user.model';
import {EditorService} from '../../../../controller/service/editor.service';
import {Message} from 'primeng/api';
import {UserArticleDetail} from "../../../../controller/model/user-article-detail.model";

@Component({
  selector: 'app-manage-reviewers',
  templateUrl: './manage-reviewers.component.html',
  styleUrls: ['./manage-reviewers.component.scss'],
  providers:[ConfirmationService]
})
export class ManageReviewersComponent implements OnInit {
  loading = true
  @ViewChild('dt') table: Table;
  display = false
  selectedReviewer = new User()
  reviewers = new Array<UserArticleDetail>()
  sucmsgs: Message[] = []
  warnmsgs: Message[] = []
  progress = false

  constructor(private editorService: EditorService, private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.editorService.getAllReviewers().then(reviewers => {
      this.reviewers = reviewers
      console.log(reviewers)
      this.loading = false
    })
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

  showDialog(rowIndex) {
    this.progress = false
    this.selectedReviewer = this.reviewers[rowIndex].user
    this.display = true;
  }

  delete() {
    this.sucmsgs = []
    this.confirmationService.confirm({
      message: 'Are you sure You want to delete this reviewer\'s account? if you do so, only the reviewer\'s account will be deleted,' +
        ' all the articles published by him or include him as a co-author will not be deleted',
      header: 'delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.progress = true
        this.warnmsgs = []
        this.editorService.deleteAccount(this.selectedReviewer.email).then(data => {
          this.display = false
          this.progress = false
          window.scrollTo(0, 0)
          // @ts-ignore
          this.sucmsgs.push({severity: 'success', summary: data.message})
          this.ngOnInit()
        }, error => {
          this.progress = false
          this.display = false
          this.warnmsgs.push({severity: 'warn', summary: error.error.message})
        })
      },
      reject: () => {
      }
    });
  }

  dismissReviewer() {
    this.sucmsgs = []
    this.warnmsgs = []
    this.confirmationService.confirm({
      message: 'Are you sure You want to dismiss this reviewer\'s from his duties ? if you do so, only the author\'s will receive ' +
        'an email with all the needed information',
      header: 'delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.editorService.dismissReviewer(this.selectedReviewer.email).then(data => {
          this.progress = false
          this.display = false
          window.scrollTo(0, 0)
          // @ts-ignore
          this.sucmsgs.push({severity: 'success', summary: data.message})
          this.ngOnInit()
        }, error => {
          this.progress = false
          this.display = false
          this.warnmsgs.push({severity: 'warn', summary: error.error.message})
        })
      },
      reject: () => {
      }
    });
  }

}
