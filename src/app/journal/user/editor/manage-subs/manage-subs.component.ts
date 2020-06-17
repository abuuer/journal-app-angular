import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ConfirmationService, Table} from 'primeng';
import {UserService} from '../../../../controller/service/user.service';
import {Article} from '../../../../controller/model/article.model';
import {EditorService} from '../../../../controller/service/editor.service';
import {User} from '../../../../controller/model/user.model';
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
  selectedArticle : Article
  selectedUser : User[]
  selectUsersIndex : number[]
  decisions: any[]
  finalDecision: any
  progress = false
  spinner = false
  private _articles : Article[]
   _reviewers : User[]
  hideRejected  = false

  statuses = [
    {label: 'Published', value: 'qualified'},
    {label: 'Rejected', value: 'unqualified'},
    {label: 'Accepted', value: 'new'},
    {label: 'Being Reviewed', value: 'renewal'},
    {label: 'Reviewed', value: 'proposal'},
    {label: 'new', value: 'negotiation'}
  ]
  reviewerStatuses = [
    {label: 'Available', value: 'qualified'},
    {label: 'Not available', value: 'unqualified'},
    {label: 'Busy', value: 'proposal'}
  ];



  constructor( private userService : UserService, private editorService : EditorService,
               private confirmationService: ConfirmationService) {
    this.decisions = [
      {label: 'Select the final decision', value: null},
      {label: 'Accept without any changes', value: 'Accepted'},
      {label: 'Accept with minor revisions', value: 'Accepted'},
      {label: 'Accept after major revisions', value: 'Accepted'},
      {label: 'Revise and resubmit', value: 'Rejected'},
      {label: 'Reject the paper', value: 'Rejected'},
    ];
  }

  ngOnInit(): void {
    this.editorService.getArticles().then(articles => {
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
  get reviewers(): User[] {
    return this._reviewers;
  }
  set reviewers(value: User[]) {
    this._reviewers = value;
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

  getLabelStatus(value: string) {
    // tslint:disable-next-line:prefer-for-of
    for(let i = 0 ; i < this.statuses.length ; i++){
      // tslint:disable-next-line:no-conditional-assignment
      if(this.statuses[i].value.toLowerCase() === value.toLowerCase()){
        return this.statuses[i].label
      }
    }
  }
  getValueStatusRv(status: string) {
    // tslint:disable-next-line:prefer-for-of
    for(let i = 0 ; i < this.reviewerStatuses.length ; i++){
      // tslint:disable-next-line:no-conditional-assignment
      if(this.reviewerStatuses[i].label.toLowerCase() === status.toLowerCase()){
        return this.reviewerStatuses[i].value
      }
    }
  }

  getLabelStatusRv(value: string) {
    // tslint:disable-next-line:prefer-for-of
    for(let i = 0 ; i < this.reviewerStatuses.length ; i++){
      // tslint:disable-next-line:no-conditional-assignment
      if(this.reviewerStatuses[i].value.toLowerCase() === value.toLowerCase()){
        return this.reviewerStatuses[i].label
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
  fiterStatusRv(value: any) {
    if(value !== null){
      this.table.filter(this.getLabelStatusRv(value),'availability','equals')
    } else {
      this.table.filter('','availability','equals')
    }
  }

  a(selectedArticle: Article) {
    return selectedArticle==null ? false : true
  }

  assignReviewer(){
    this.warnmsgs = []
    this.sucmsgs = []
    this.loadingSec = true
    // tslint:disable-next-line:prefer-for-of
    for(let i = 0 ; i < this.selectedUser.length ; i++) {
      this.editorService.assignReviewer(this.selectedUser[i].email, this.selectedArticle.reference).subscribe(
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

  showSelectedUsers(){
    this.selectedUser = []
    for(let i = 0 ; i < this.reviewers.length ; i++){
      if(this.selectUsersIndex.includes(i)){
        this.selectedUser.push(this.reviewers[i])
      }
    }
  }

  save() {
    this.showSelectedUsers()
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

  deleteReviewer(email: string) {
    this.sucmsgs = []
    this.spinner = true
    this.editorService.deleteReviewer(email, this.selectedArticle.reference).then(data=>{
      window.scrollTo(0,0)
      // @ts-ignore
      this.sucmsgs.push({severity:'success', summary: data.message})
      this.spinner = false
      window.location.reload()
    }, error => {
      this.spinner = false
      window.scrollTo(0,0)
      this.sucmsgs.push({severity:'warn', summary: 'Request not completed'})
    })
  }

  submitFinalDecision() {
    this.sucmsgs = []
    this.confirmationService.confirm({
      message: `Are you sure you want to ${this.finalDecision} this paper?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.progress = true
        this.editorService.submitFinalDecision(this.finalDecision, this.selectedArticle.reference).then(data=>{
          this.progress = false
          // @ts-ignore
          this.sucmsgs.push({severity:'success', summary: 'Your decision has been saved successfully'})
          window.scrollTo(0,0)
          window.location.reload()
        }, error=> {
          this.progress = false
          this.sucmsgs.push({severity:'warn', summary: 'We can\'t save your decision at the moment'})
          window.scrollTo(0,0)
        })
      },
      reject: () => {}
    });
  }

  scroll(target: HTMLDivElement, i) {
    this.selectedArticle = this.articles[i]
    target.scrollIntoView()
  }

  scrollToTop() {
    window.scrollTo(0,0)
  }
}
