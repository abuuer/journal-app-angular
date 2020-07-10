import {Component, OnInit, ViewChild} from '@angular/core';
import {Article} from '../../../../../controller/model/article.model';
import {ConfirmationService, Table} from 'primeng';
import {EditorService} from '../../../../../controller/service/editor.service';
import {Message} from 'primeng/api';
import {Volume} from '../../../../../controller/model/volume.model';
import {Issue} from '../../../../../controller/model/issue.model';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
  providers: [ConfirmationService]
})
export class AddArticleComponent implements OnInit {
  articles : Article[];
  selectedArticle: Article;
  @ViewChild('dt') table: Table;
  hidePublished = false
  loading = true
  volumes: Volume[]
  chosenVolume: Volume
  issues: Issue[]
  chosenIssue: Issue
  progress = false
  message: Message[] = []
  loadingv =true
  loadingi =false


  constructor(private editorService: EditorService , private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
    this.editorService.findAllVolumes().then(data=>{
      this.volumes = data
      this.loadingv = false
    })
    this.editorService.findByStatus().then(data=>{
      this.articles = data
      this.loading = false
    })
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



  scroll(target: HTMLDivElement, i) {
    this.message = []
    this.selectedArticle = this.articles[i]
    target.scrollIntoView()
  }

  addToSubmit() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want add this article to the selected issue?',
      header: 'Save',
      icon: 'pi pi-check-circle',
      accept: () => {
        this.progress = true
         this.addToIssue()
      },
      reject: () => {}
    });
  }

  private addToIssue() {
    this.message = []
    if(this.chosenIssue == null){
      this.progress = false
      this.message.push({severity:'error', summary: 'You muse select an issue'})
    }else {
      this.editorService.addToIssue(this.selectedArticle.reference, this.chosenIssue.number,this.chosenVolume.number).then(data=>{
        // @ts-ignore
        this.message.push({severity:'success', summary: data.message})
        window.location.reload()
        this.progress = false
      },error=> {
        this.message.push({severity:'warn', summary: error.error.message})
        this.progress = false
      })
    }
  }

  showIssues(i) {
    this.loadingi = true
    this.chosenVolume = this.volumes[i]
    this.issues = this.chosenVolume.issues
    this.chosenIssue = null
    /*this.editorService.findByVolumeNumber(this.volumes[i].number).then(data=>{
      this.issues = data
      this.loadingi =false
    })*/
  }

  selectIssues(i) {
    this.chosenIssue = this.issues[i]
  }
}
