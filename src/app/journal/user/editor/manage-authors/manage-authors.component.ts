import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, Table} from 'primeng';
import {User} from '../../../../controller/model/user.model';
import {EditorService} from '../../../../controller/service/editor.service';
import {Message} from 'primeng/api';
import {UserArticleDetail} from '../../../../controller/model/user-article-detail.model';

@Component({
  selector: 'app-manage-authors',
  templateUrl: './manage-authors.component.html',
  styleUrls: ['./manage-authors.component.scss'],
  providers:[ConfirmationService]
})
export class ManageAuthorsComponent implements OnInit {
  loading = true
  @ViewChild('dt') table: Table;
  authors = new Array<User>()
  selectedAuthor = new User()
  display = false
  message: Message[] = []
  warnmessage: Message[] = []
  progress = false
  constructor(private editorService: EditorService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.editorService.getAllAuthors().then(authors => {
      console.log('hi')
      console.log(authors)
      this.authors = authors
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
    this.selectedAuthor = this.authors[rowIndex]
    this.display = true ;
  }

  delete() {
    this.message = []
    this.warnmessage = []
    this.confirmationService.confirm({
      message: 'Are you sure You want to delete this author\'s account? if you do so, only the author\'s account will be deleted,' +
        ' all the articles published by him or include him as a co-author will not be deleted',
      header: 'delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.progress = true
        this.editorService.deleteAccount(this.selectedAuthor.email).then(data=>{
          // @ts-ignore
          this.message.push({severity:'success', summary: data.message})
          this.display = false
          this.progress = false
        }, error=> {
          this.display = false
          this.progress = false
          this.warnmessage.push({severity:'warn', summary: error.error.message})
        })
      },
      reject: () => {}
    });
  }

  promote() {
    this.message = []
    this.warnmessage = []
    this.confirmationService.confirm({
      message: 'Are you sure You want to promote this author\'s to become a reviewer? if you do so, only the author\'s will receive ' +
        'an email with all the needed information',
      header: 'delete',
      icon: 'pi pi-check',
      accept: () => {
        this.progress = true
        this.editorService.authorToReviewer(this.selectedAuthor).then(data=>{
          this.display = false
          this.progress = false
          window.scrollTo(0,0)
          // @ts-ignore
          this.message.push({severity:'success', summary: data.message})
        }, error => {
          this.display = false
          this.progress = false
          window.scrollTo(0,0)
          this.warnmessage.push({severity:'warn', summary: error.error.message})
        })
      },
      reject: () => {}
    });
  }

  showProgressBar() {
    return this.progress
  }

  scroll(target: HTMLDivElement, rowIndex) {
    this.selectedAuthor = this.authors[rowIndex]
    target.scrollIntoView()
  }

  scrollToTop() {
    window.scrollTo(0,0)
  }
}
