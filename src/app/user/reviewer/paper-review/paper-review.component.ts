import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Article} from '../../../controller/model/article.model';
import {ReviewerService} from '../../../controller/service/reviewer.service';
import {Observable} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {FileInfo} from '../../../controller/model/file.model';

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
  reviewFile = new FileInfo()
  private _finalReview = new FileInfo()
  private _article = new Article()
  decisions: any[]
  finalNotes: string;
  constructor(private reviewerService : ReviewerService) {
  }

  ngOnInit(): void {
    this.article = this.reviewerService.getLocalStorage().article
    if(this.reviewerService.getLocalStorageReview() != null){
      this.finalReview = this.reviewerService.getLocalStorageReview().articleReview
    }
    console.log(typeof this.finalReview)
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
    this.article.fileInfos.push(this.finalReview)
    this.reviewerService.submitAticle(this.article)
    // localStorage.removeItem()
  }

  deleteFile() {
    localStorage.removeItem(`final-review${this.reviewerService.getLocalStorage().article.id}`)
    this.finalReview = null
  }
}
