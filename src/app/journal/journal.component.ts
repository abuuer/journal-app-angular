import { Component, OnInit } from '@angular/core';
import {JournalService} from '../controller/service/journal.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {


  constructor(private journalService: JournalService) { }

  ngOnInit(): void {

  }

}
