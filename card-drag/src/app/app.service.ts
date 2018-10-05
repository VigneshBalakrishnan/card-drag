import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class DataObjectService {
  data: any = [
    { id: 'A', name: 'BV', childData: [] },
    { id: 'B', name: 'TT', childData: [] },
    { id: 'C', name: 'CC', childData: [] }
  ];
  public dataSubject: ReplaySubject<any> = new ReplaySubject(1);
  constructor() {
    this.dataSubject.next(this.data);
  }

  onClose(recordRemoved) {
    this.data = this.data
      .filter(item => item.id !== recordRemoved.id)
      .map(items => ({
        ...items,
        childData: items.childData.filter(data => data.id !== recordRemoved.id)
      }));
    this.dataSubject.next(this.data);
  }
  onDropped(parentRecord, childRecord) {
    this.data = this.data.map(
      item =>
        item.id === parentRecord.id
          ? {
              ...item,
              childData: [
                ...item.childData,
                {
                  ...childRecord,
                  id:
                    parentRecord.id +
                    '_child_' +
                    childRecord.id +
                    new Date().getTime()
                }
              ]
            }
          : item
    );
    this.dataSubject.next(this.data);
  }
}
