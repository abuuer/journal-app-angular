import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng';

@Component({
  selector: 'app-all-issues',
  templateUrl: './all-issues.component.html',
  styleUrls: ['./all-issues.component.scss']
})
export class AllIssuesComponent implements OnInit {
  years: TreeNode[]

  constructor() { }

  ngOnInit(): void {
    this.years = [
      {
        label: '2020',
        data: '202020',
        children: [
          {
            label: 'Volume I Issue 1',
          },
          {
            label: 'Volume I Issue 2',
          }
        ]
      }
    ]
  }


}
