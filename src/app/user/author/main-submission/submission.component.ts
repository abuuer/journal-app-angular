import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem, Message, MessageService} from 'primeng/api';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {SubmissionService} from '../../../controller/service/submission.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Article} from '../../../controller/model/article.model';
import {User} from '../../../controller/model/user.model';
import {UserArticleDetail} from '../../../controller/model/user-article-detail.model';
import {ArticleFunds} from '../../../controller/model/article-funds.model';
import {Tag} from '../../../controller/model/tag.model';
import {ArticleTags} from '../../../controller/model/article-tags.model';
import {TokenStorageService} from '../../../controller/service/token-storage.service';


@Component({
  selector: 'app-submission',
  providers: [
    MessageService
  ],
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class SubmissionComponent implements OnInit {
  items: MenuItem[];
  activeIndex = 0;
  i: number;
  value: string;
  selectedValue = 'original';
  wordcmp = 0;
  types: any[];
  sourceTags: object[];
  targetTags: object[];
  finalTagsList: string[] = [];
  msgs: Message[] = [];
  additionalTags: string;
  display = false;
  displayBasic: boolean;
  currentFile: File;
  uploadedFiles: FileList;
  matcher = new MyErrorStateMatcher();
  progress = 0;
  message = '';
  fileInfos: Observable<any>;
  check = false;
  show = false ;
  private _currentUser : User ;
  private _article = new Article();
  private newCoAuthor = new User();
  private userArticleDetail = new UserArticleDetail()
  private _newfunding = new ArticleFunds();
  private _articleTag= new ArticleTags()

  authForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('',[Validators.required, Validators.email]),
      emailConf: new FormControl('',[Validators.required, Validators.email]),
      institution: new FormControl('',[Validators.required]),
    }
  )

  constructor(private messageService: MessageService, private submissionService: SubmissionService,
              public tokenStorage: TokenStorageService) {
    this.types = [
      {label: 'Select your item\'s type', value: null},
      {label: 'Main Document (PDF)', value: 'Main'},
      {label: 'Cover Letter', value: 'letter'},
      {label: 'Supplemental Material', value: 'supp'},
      {label: 'Copyright Form', value: 'cpyright'},
    ];
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    console.log(this.currentUser)

    this.fileInfos = this.submissionService.getFiles();
    this.article = this.submissionService.getLocalStorage().article;
    this.selectedValue = this.article.type ;
    this.items = [
      {
        label: 'General',
        command: (event: any) => {
          this.activeIndex = 0;
          this.messageService.add({severity: 'info', summary: 'General', detail: event.item.label});
          this.value = '0';
        }
      },
      {
        label: 'File Upload',
        command: (event: any) => {
          this.activeIndex = 1;
          this.messageService.add({severity: 'info', summary: 'File Upload', detail: event.item.label});
          this.value = '1';
        }
      },
      {
        label: 'Attributes',
        command: (event: any) => {
          this.activeIndex = 2;
          this.messageService.add({severity: 'info', summary: 'Attributes', detail: event.item.label});
          this.value = '2';
        }
      },
      {
        label: 'Authors & Institutions',
        command: (event: any) => {
          this.activeIndex = 3;
          this.messageService.add({severity: 'info', summary: 'Authors & Institutions', detail: event.item.label});
          this.value = '3';
        }
      },
      {
        label: 'Details & Comments',
        command: (event: any) => {
          this.activeIndex = 4;
          this.messageService.add({severity: 'info', summary: 'Details & Comments', detail: event.item.label});
          this.value = '4';
        }
      },
      {
        label: 'Review & Submit',
        command: (event: any) => {
          this.activeIndex = 5;
          this.messageService.add({severity: 'info', summary: 'Review & Submit', detail: event.item.label});
          this.value = '5';
        }
      }
    ];
    this.sourceTags = [
      {label: 'AI', value: 'AI'},
      {label: 'Computing', value: 'Computing'},
      {label: 'Quantum Computers', value: 'Quantum'},
      {label: 'HMI', value: 'HMI'},
      {label: 'Machine learning', value: 'Machine'},
      {label: 'Hacking', value: 'Hacking'},
      {label: 'Security', value: 'Security'},
    ]
    this.targetTags = [];
  }

  get firstName(): any {
    return this.authForm.get('firstName');
  }
  get lastName(): any {
    return this.authForm.get('lastName');
  }
  get email(): any {
    return this.authForm.get('email');
  }
  get emailConf(): any {
    return this.authForm.get('emailConf');
  }
  get institution(): any {
    return this.authForm.get('institution');
  }
  get article(): Article {
    return this._article;
  }
  set article(value: Article) {
    this._article = value;
  }
  get newfunding(): ArticleFunds {
    return this._newfunding;
  }
  get articleTag(): ArticleTags {
    return this._articleTag;
  }
  set articleTag(value: ArticleTags) {
    this._articleTag = value;
  }
  get currentUser(): User {
    if(this._currentUser == null){
      this._currentUser = new User()
    }
    return this._currentUser;
  }
  set currentUser(value: User) {
    this._currentUser = value;
  }

  changeIndex(i) {
    this.sendToLS();
    this.activeIndex = i;
    this.value = i;
  }

  // file upload
  selectFile($event){
    this.uploadedFiles = $event.target.files ;
    this.currentFile = this.uploadedFiles.item(0);
    console.log(this.currentFile);
  }
  upload($eventFile) {
   // this.currentFile = $eventFile.files[0];
    this.submissionService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          console.log('if');
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          console.log('else if');
          this.fileInfos = this.submissionService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.uploadedFiles = undefined;
  }
  resetFilter() {
    this.sourceTags = [
      {label: 'AI', value: 'AI'},
      {label: 'Computing', value: 'Computing'},
      {label: 'Quantum Computers', value: 'Quantum'},
      {label: 'HMI', value: 'HMI'},
      {label: 'Machine learning', value: 'Machine'},
      {label: 'Hacking', value: 'Hacking'},
      {label: 'Security', value: 'Security'},
    ],
      this.targetTags = [];
  }

  // add article tags
  addToList() {
      this.msgs = [];
      let x = true;
      console.log(this.finalTagsList)
      console.log(this.finalTagsList.length)
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < this.targetTags.length; j++) {
        // @ts-ignore
        if (!this.finalTagsList.includes(this.targetTags[j].label)) {
          // @ts-ignore
          this.finalTagsList.push(this.targetTags[j].label)
        }
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.finalTagsList.length; i++) {
          x = true;
          this.articleTag.tag.name = this.finalTagsList[i]
          // tslint:disable-next-line:prefer-for-of
          for (let k = 0; k < this.article.articleTags.length; k++) {
            if (this.article.articleTags[k].tag.name === this.articleTag.tag.name) {
              console.log(this.article.articleTags[k].tag.name)
              console.log(this.articleTag.tag.name)
              x = false;
              console.log(x)
            }
          }
          if (x === true) {
            if (this.article.articleTags.length < 6) {
              this.article.articleTags.push(this.cloneTag(this.articleTag))
            } else {
              this.msgs = [];
              this.msgs.push({severity: 'warn', summary: 'Warn Message', detail: 'Maximum allowed tags is 6'});
            }
          }
        }
      }
      this.sendToLS();
  }

  addAdditional() {
    if (this.finalTagsList.length < 6) {
      console.log(this.additionalTags)
      if (!this.finalTagsList.includes(this.additionalTags)) {
        {
          this.finalTagsList.push(this.additionalTags);
        }
      }
    }
    else {
      this.msgs = [];
      this.msgs.push({severity: 'warn', summary: 'Warn Message', detail: 'Maximum allowed tags is 6'});
    }
  }

  showDialog() {
    this.display = true ;
  }
  sendToLS(){
    // tslint:disable-next-line:prefer-for-of
    if(this.article.funding === false){
      this.article.articleFunds = null;
    }
    return this.submissionService.setLocalStorage(this.article);
  }

  addCoAuhor() {
    if(this.article.userArticleDetails == null ){
      this.article.userArticleDetails = new Array();
    }
    this.newCoAuthor = this.authForm.value;
    this.userArticleDetail.author = this.newCoAuthor ;
    // console.log(this.userArticleDetail);
    this.article.userArticleDetails.push(this.clone(this.userArticleDetail));
    console.log(this.article.userArticleDetails);
  }

  addFunder() {
    if(this.article.articleFunds == null){
      this.article.articleFunds = new Array();
    }
    this.article.articleFunds.push(this.clonefunds(this.newfunding));
    this.sendToLS();
  }

  remove(i) {
    this.article.articleFunds.splice(i,1)
    console.log(this.article.articleFunds)
    this.sendToLS();
  }

  clone(userArticleDetail : UserArticleDetail): UserArticleDetail{
    const clone = new UserArticleDetail();
    clone.author = userArticleDetail.author;
    return clone;
  }
  clonefunds(newfunding: ArticleFunds) {
    const clone = new ArticleFunds();
    clone.funder = newfunding.funder;
    clone.amount = newfunding.amount;
    return clone;
  }
  cloneTag(articleTag: ArticleTags) {
    const clone = new ArticleTags()
    clone.tag = this.cloneTags(articleTag.tag)
    return clone;
  }
  private cloneTags(tag: Tag) {
    const clone = new Tag()
    clone.name = tag.name
    return clone;
  }

  deleteTag(i) {
    this.article.articleTags.splice(i,1)
  }

  submitAticle() {
    return this.submissionService.submitAticle(this.article)
  }

  deleteAuthor(i) {
    this.article.userArticleDetails.splice(i,1)
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
