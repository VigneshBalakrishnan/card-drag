import { Component } from '@angular/core';
import { DataObjectService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dataService: DataObjectService) {
    this.dataService.dataSubject.subscribe(response => {
      console.log(response);
      this.data = response;
    });
    console.log(this.data);
  }
  title = 'card-drag';
  data: any = [];

  onDragStart(event: any, data: any) {
    event['dataTransfer'].setData('data', JSON.stringify(data));
  }
  click(recordRemoved) {
    this.dataService.onClose(recordRemoved);
  }
  allowDrop(e) {
    e.preventDefault();
  }
  onDrop(event, parentRecord) {
    event.preventDefault();
    const childRecord = JSON.parse(event.dataTransfer.getData('data'));
    this.dataService.onDropped(parentRecord, childRecord);
  }
}
