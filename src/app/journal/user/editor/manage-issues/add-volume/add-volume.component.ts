import {Component, OnInit, ViewChild} from '@angular/core';
import {Article} from '../../../../../controller/model/article.model';
import {ConfirmationService, Message, Table} from 'primeng';
import {EditorService} from '../../../../../controller/service/editor.service';
import {Volume} from '../../../../../controller/model/volume.model';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-add-volume',
  templateUrl: './add-volume.component.html',
  styleUrls: ['./add-volume.component.scss'],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class AddVolumeComponent implements OnInit {
  progress = true
  display = false
  spinner= false
  message : Message[] = []
  volumes : Volume[]
  private _volume : Volume
  private _selectedVolume : Volume


  constructor(private editorService : EditorService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.editorService.findAllVolumes().then(data=>{
      this.volumes = data
      this.progress = false
    })
  }

  get selectedVolume(): Volume {
    if(this._selectedVolume == null){
      this._selectedVolume = new Volume()
    }
    return this._selectedVolume;
  }

  set selectedVolume(value: Volume) {
    this._selectedVolume = value;
  }
  get volume(): Volume {
    if(this._volume == null){
      this._volume = new Volume()
    }
    return this._volume;
  }

  set volume(value: Volume) {
    this._volume = value;
  }
  showDialog(i: number) {
    this.display = true
    this._selectedVolume = this.volumes[i]
  }

  delete() {

  }

  addVolume() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to create a new volume?',
      header: 'Save',
      icon: 'pi pi-check-circle',
      accept: () => {
        this.spinner = true
        this.editorService.addVolume(this.volume).then(data=>{
          this.message = [];
          this.spinner = false
          // @ts-ignore
          this.message.push({severity: 'success', summary: 'Warn Message', detail: data.message});
          window.location.reload()
        }, error=>{
          this.message = [];
          this.spinner = false
          // @ts-ignore
          this.message.push({severity: 'warn', summary: 'Warn Message', detail: error.error.message});
        })
      },
      reject: () => {}
    });
  }
}
