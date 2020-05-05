import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem, Message, MessageService} from 'primeng/api';


@Component({
  selector: 'app-submission',
  providers: [MessageService],
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
  uploadedFiles: object[] = [];
  types: any[];
  sourceTags: object[];
  targetTags: object[];
  finalTagsList: string[] = [];
  msgs: Message[] = [];
  additionalTags: string;

  constructor(private messageService: MessageService) {
    this.types = [
      {label: 'Select your item\'s type', value: null},
      {label: 'Main Document (PDF)', value: 'Main'},
      {label: 'Cover Letter', value: 'letter'},
      {label: 'Supplemental Material', value: 'supp'},
      {label: 'Copyright Form', value: 'cpyright'},
    ]
  }

  ngOnInit(): void {
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
        label: 'Reviewers',
        command: (event: any) => {
          this.activeIndex = 4;
          this.messageService.add({severity: 'info', summary: 'Reviewers', detail: event.item.label});
        }
      },
      {
        label: 'Details & Comments',
        command: (event: any) => {
          this.activeIndex = 5;
          this.messageService.add({severity: 'info', summary: 'Details & Comments', detail: event.item.label});
          this.value = '5';
        }
      },
      {
        label: 'Review & Submit',
        command: (event: any) => {
          this.activeIndex = 6;
          this.messageService.add({severity: 'info', summary: 'Review & Submit', detail: event.item.label});
          this.value = '6';
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
    ],
      this.targetTags = [];
  }

  changeIndex(i) {
    this.activeIndex = i;
    this.value = i;
  }

  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  resetFilter() {
    this.targetTags = null;
    this.ngOnInit();
  }


  addToList() {
    // to do : count this.finalTagsList first then push
    if (this.finalTagsList.length < 6) {
      this.msgs = [];
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < this.targetTags.length; j++) {
        // @ts-ignore
        if (!this.finalTagsList.includes(this.targetTags[j].label)) {
          // @ts-ignore
          this.finalTagsList.push(this.targetTags[j].label);
        } else {
          console.log('already exist')
        }
      }
    } else {
      this.msgs = [];
      this.msgs.push({severity: 'warn', summary: 'Warn Message', detail: 'Maximum allowed tags is 6'});
    }
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
}
