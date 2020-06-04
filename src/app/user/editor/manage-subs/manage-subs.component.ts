import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, Table} from 'primeng';
import {UserService} from '../../../controller/service/user.service';
import {Article} from '../../../controller/model/article.model';
import {EditorService} from '../../../controller/service/editor.service';
import {User} from '../../../controller/model/user.model';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-manage-subs',
  templateUrl: './manage-subs.component.html',
  styleUrls: ['./manage-subs.component.scss'],
  providers:[ConfirmationService]
})
export class ManageSubsComponent implements OnInit {
  loading = true;
  display = false ;
  loadingSec =  false;
  warnmsgs: Message[] = []
  sucmsgs: Message[] = []
  @ViewChild('dt') table: Table;
  selectedArticle: Article;
  selectedUser = new Array <any>();
  private _articles : Article[]
  private _reviewers : User[]

  statuses = [
    {label: 'reviewed', value: 'qualified'},
    {label: 'rejected', value: 'rejected'},
    {label: 'pending', value: 'negotiation'},
    {label: 'new', value: 'new'},
    {label: 'being reviewed', value: 'renewal'},

  ];

  constructor( private userService : UserService, private editorService : EditorService,
               private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    console.log(this.selectedUser)
    this.editorService.getArticles().then(articles => {
      this.articles = articles
      console.log(articles)
      this.loading = false
    })
  }
  get articles(): Article[] {
    return this._articles;
  }
  set articles(value: Article[]) {
    this._articles = value;
  }
  get reviewers(): User[] {
    return this._reviewers;
  }
  set reviewers(value: User[]) {
    this._reviewers = value;
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
    this.selectedUser = []
    this.display = true ;
    this.loadingSec = true
    this.editorService.getAllReviewers().then(reviewers=>{
      this.reviewers = reviewers
      this.loadingSec = false
    })
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

  a(selectedArticle: Article) {
    return selectedArticle==null ? false : true
  }

  assignReviewer(){
    this.warnmsgs = []
    this.sucmsgs = []
    // tslint:disable-next-line:prefer-for-of
    for(let i = 0 ; i < this.selectedUser.length ; i++) {
      this.editorService.assignReviewer(this.selectedUser[i].id, this.selectedArticle.reference).subscribe(
        data => {
          this.display=false
          window.scrollTo(0,0)
          // @ts-ignore
          this.sucmsgs.push({severity:'success', summary: data.message})
          this.ngOnInit()
        },
        err => {
          this.display=false
          window.scrollTo(0,0)
          this.ngOnInit()
          this.warnmsgs.push({severity:'warn', summary: err.error.message})
        }
      )
    }
      /*.then(msg=>{
      this.msgs = []
      this.msgs.push({severity:'warn', summary: msg.toString()})
      }
    )*/
  }

  save() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to assign the selected reviewers?',
      header: 'Save',
      icon: 'pi pi-check-circle',
      accept: () => {
        this.assignReviewer()
      },
      reject: () => {}
    });
  }

  cancel() {
    if(this.selectedUser.length !== 0){
      this.confirmationService.confirm({
        message: 'Are you sure that you want to cancel your selected reviewers?',
        header: 'Cancel',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.display=false
        },
        reject: () => {}
      });
    } else {
      this.display = false
    }
  }
}
