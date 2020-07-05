import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {SubmissionService} from '../../../../../controller/service/submission.service';
import {ConfirmationService, Message, Table} from 'primeng';
import {Issue} from '../../../../../controller/model/issue.model';
import {Article} from '../../../../../controller/model/article.model';
import {EditorService} from '../../../../../controller/service/editor.service';
import {MessageService} from 'primeng/api';
import {Volume} from '../../../../../controller/model/volume.model';
import {FileInfo} from '../../../../../controller/model/file.model';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.scss'],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class AddIssueComponent implements OnInit {
  volumes: Volume[]
  months: any[]
  progress = 0
  progressId = 0
  currentFile: File
  message : Message[] = []
  progressBar = false
  switch: any;
  issues : Issue[];
  selectedIssue : Issue
  selectedArtcile : Article
  private _issue : Issue
  loading = true
  loadingIssues = true
  @ViewChild('dt') table: Table
  articles : Article[]

  issueStatuses = [
    {label: 'Published', value: 'qualified'},
    {label: 'On Hold', value: 'negotiation'}
  ]


  constructor(private submissionService: SubmissionService, private confirmationService: ConfirmationService
              , private editorService : EditorService ,private messageService: MessageService) {
    this.months = [
      {label: 'Select the month', value: null},
      {label: 'January', value: 'January'},
      {label: 'February', value: 'February'},
      {label: 'March', value: 'March'},
      {label: 'April', value: 'April'},
      {label: 'May', value: 'May'},
      {label: 'June', value: 'June'},
      {label: 'July', value: 'July'},
      {label: 'August', value: 'August'},
      {label: 'September', value: 'September'},
      {label: 'October', value: 'October'},
      {label: 'November', value: 'November'},
      {label: 'December', value: 'December'}
    ]
  }

  ngOnInit(): void {
   /* this.editorService.findByIssueNumber().then(data=>{
      this.articles = data
      this.loading = false
    })*/
    this.editorService.findAllVolumes().then(data=>{
      this.volumes = data
    })
    this.editorService.findAllIssues().then(data=>{
      this.issues = data
      console.log(data)
      this.loadingIssues = false
    })
  }

  upload(event, i: number) {
    this.progress = 0
    this.currentFile = event.files[0]
    this.progressId = i
    this.submissionService.upload(this.currentFile, 'Cover page').subscribe(
      data => {
        if (data.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * data.loaded / data.total);
        } else if (data instanceof HttpResponse) {
          this.progress = 0;
          this.progressId = 0
          this.message = [];
          this.message.push({severity: 'success', detail: `Uploaded ${data.body.name} Successfully`});
           this.issue.fileInfos.push(this.cloneFile(data.body))
          window.scrollTo(0,0)
        }
      },
      err => {
        this.progress = 100;
        this.progressId = 0
        this.message = [];
        this.message.push({severity: 'warn', detail: `Could not upload the file!`});
        window.scrollTo(0,0)
      })
  }

  cloneFile(body: any): FileInfo {
    const file = new FileInfo()
    file.url = body.url
    file.name = body.name
    file.type = 'Cover page'
    file.reference = body.reference
    return file
  }
  addToSubmit() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want add this issue to the selected volume?',
      header: 'Save',
      icon: 'pi pi-check-circle',
      accept: () => {
        this.progressBar = true
         this.editorService.createNewIssue(this.issue).then(data=>{
           this.message = [];
           this.progressBar = false
           window.scrollTo(0,0)
           // @ts-ignore
           this.message.push({severity: 'success', detail: data.message});
           window.location.reload()
         }, error=>{
           this.message = [];
           this.progressBar = false
           window.scrollTo(0,0)
           // @ts-ignore
           this.message.push({severity: 'warn', detail: error.error.message});
           window.scrollTo(0,0)
         })
      },
      reject: () => {}
    });
  }

  switchN(i: number) {
    this.switch = i
  }

  getValueStatus(issueStatuses: string) {
    // tslint:disable-next-line:prefer-for-of
    for(let i = 0 ; i < this.issueStatuses.length ; i++){
      // tslint:disable-next-line:no-conditional-assignment
      if(this.issueStatuses[i].label.toLowerCase() === issueStatuses.toLowerCase()){
        return this.issueStatuses[i].value
      }
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


  getLabelStatus(value: string) {
    // tslint:disable-next-line:prefer-for-of
    for(let i = 0 ; i < this.issueStatuses.length ; i++){
      // tslint:disable-next-line:no-conditional-assignment
      if(this.issueStatuses[i].value.toLowerCase() === value.toLowerCase()){
        return this.issueStatuses[i].label
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

  show(i) {
    this.selectedIssue = this.issues[i]
  }

  deleteArticle(i) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this article from the selected issue?',
      header: 'Save',
      icon: 'pi pi-check-circle',
      accept: () => {
        this.progressBar = true
        this.editorService.deleteArticle(this.selectedIssue.articles[i]).then(data=>{
          this.message = [];
          this.progressBar = false
          window.scrollTo(0,0)
          // @ts-ignore
          this.message.push({severity: 'success', detail: data.message});
           window.location.reload()
        }, error=>{
          this.message = [];
          this.progressBar = false
          // @ts-ignore
          this.message.push({severity: 'warn', detail: error.error.message});
          window.scrollTo(0,0)
        })
      },
      reject: () => {}
    });
  }

  publishIssue() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to publish this issue?',
      header: 'Save',
      icon: 'pi pi-check-circle',
      accept: () => {
        this.progressBar = true
        this.editorService.publishIssue(this.selectedIssue.number,1).then(data=>{
          this.message = [];
          this.progressBar = false
          // @ts-ignore
          this.message.push({severity: 'success', detail: data.message});
          window.scrollTo(0,0)
        }, error=>{
          this.message = [];
          this.progressBar = false
          // @ts-ignore
          this.message.push({severity: 'warn', detail: error.error.message});
          window.scrollTo(0,0)
        })
      },
      reject: () => {}
    });
  }
}
