import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Article} from '../../../../controller/model/article.model';
import {ReviewerService} from '../../../../controller/service/reviewer.service';
import {Observable} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {FileInfo} from '../../../../controller/model/file.model';
import {Message} from "primeng/api";

@Component({
  selector: 'app-paper-review',
  templateUrl: './paper-review.component.html',
  styleUrls: ['./paperreview.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PaperReviewComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = ''
  msg: Message[] = [];
  reviewFile = new FileInfo()
  private _finalReview = new FileInfo()
  private _article = new Article()
  decisions: any[]
  finalNotes: string;
  progressBar =  false
  constructor(private reviewerService : ReviewerService) {
  }

  ngOnInit(): void {
    this.article = this.reviewerService.getLocalStorage().article
    if(this.reviewerService.getLocalStorageReview() != null){
      this.finalReview = this.reviewerService.getLocalStorageReview().articleReview
    }
  }

  get article(): Article {
    return this._article;
  }
  set article(value: Article) {
    this._article = value;
  }
  get finalReview(): FileInfo {
    if(this._finalReview == null){
      this._finalReview = new FileInfo()
    }
    return this._finalReview;
  }

  set finalReview(value: FileInfo) {
    this._finalReview = value;
  }

  upload(event) {
    this.progress = 0;
    this.currentFile = event.files[0]

    this.reviewerService.upload(this.currentFile).subscribe(
      data => {
        if (data.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * data.loaded / data.total);
        } else if (data instanceof HttpResponse) {
          this.message = 'Uploaded ' + data.body.name + ' Successfully'
          this.finalReview =  this.cloneFile(data.body)
          this.reviewerService.setLocalStorageReview(this.finalReview)
          this.currentFile = undefined;
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
  }

  cloneFile(body: any): FileInfo {
    const file = new FileInfo()
    file.url = body.url
    file.name = body.name
    file.type = body.type
    return file
  }

  save() {
    this.msg = []
    this.progressBar  = true
    this.finalReview.article = this.article
    this.reviewerService.submitAticle(this.finalReview).then(data=>{
      this.progressBar  = false
      this.msg.push({severity: 'success', summary: 'Your review has been submitted successfully and will be reviewed by the editorial board'});
      localStorage.removeItem(`final-review${this.reviewerService.getLocalStorage().article.ref}`)
      localStorage.removeItem(`article`)
      window.scrollTo(0,0)
      window.location.href = '../submissions'
    },error=> {
      this.msg.push({severity: 'warn', summary: 'Your review can\'t be submitted at the moment'});
    })
  }

  deleteFile() {
    localStorage.removeItem(`final-review${this.reviewerService.getLocalStorage().article.ref}`)
    this.finalReview = null
  }
}
