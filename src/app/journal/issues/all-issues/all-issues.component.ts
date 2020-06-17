import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng';
import {EditorService} from '../../../controller/service/editor.service';
import {Volume} from '../../../controller/model/volume.model';
import {UserService} from '../../../controller/service/user.service';
import {Issue} from '../../../controller/model/issue.model';

@Component({
  selector: 'app-all-issues',
  templateUrl: './all-issues.component.html',
  styleUrls: ['./all-issues.component.scss']
})
export class AllIssuesComponent implements OnInit {
  private _volumes : Volume[]
  expand = false
  year : number
  decades : string[] = []
  spinner = true

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.findAllPublishedVolumes().then(data=>{
      this.volumes = data,
        this.getallDecades()
        this.spinner = false
    })
  }

  get volumes(): Volume[] {
    if(this._volumes == null){
      this._volumes = new Array<Volume>()
    }
    return this._volumes;
  }
  set volumes(value: Volume[]) {
    this._volumes = value;
  }

  show(year: number) {
    this.expand = !this.expand
    this.year = year
  }

  getallDecades(){
    // tslint:disable-next-line:prefer-for-of
    for(let i =0 ; i< this.volumes.length ; i++){
      if(!this.decades.includes(this.getDecade(this.volumes[i].year))){
        this.decades.push(this.getDecade(this.volumes[i].year))
      }
    }
  }

  getDecade(year: number) {
    const d = year.toString()
    const r = d.substr(0,3) + '0'
    return r + 's'
  }

  getIssue(issue: Issue) {
    this.userService.issue = issue
  }
}
