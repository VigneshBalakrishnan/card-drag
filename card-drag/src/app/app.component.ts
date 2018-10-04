import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'card-drag';
  data: any = [{ id: 'A', name: 'BV' }, { id: 'B', name: 'TT' }];
  onDragStart(e: any, data: any) {
    // SET DATATRANSFER OF DATA
    // event["dataTransfer"].setData('data', JSON.stringify(data));
    event['dataTransfer'].setData('data', JSON.stringify(data));
    console.log(data);
  }
  click(a) {
    this.data = this.data.filter(item => item.id !== a.id);
    console.log(this.data, a.id);
  }
  allowDrop(e) {
    e.preventDefault();
  }
  onDrop(e, a) {
    e.preventDefault();
    const data = e.dataTransfer.getData('data');
    console.log(data, a);
    this.data = this.data.map(
      item => (item.id === a.id ? (item.childData = [JSON.parse(data)]) : item)
    );
  }
}
