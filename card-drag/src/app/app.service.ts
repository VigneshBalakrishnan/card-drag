import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class DataObjectService {
  data: any = [
    { ID: 'A1', PersonName: 'Kate' },
    { ID: 'A2', PersonName: 'Stephanie' },
    { ID: 'A3', PersonName: 'Lisa' },
    { ID: 'A5', PersonName: 'Martina' },
    { ID: 'A6', PersonName: 'Frank' },
    { ID: 'A7', PersonName: 'Joe' }
  ];
  copyData: any = this.data;
  public dataSubject: ReplaySubject<any> = new ReplaySubject(1);
  public copyDisplaySubject: ReplaySubject<any> = new ReplaySubject(1);
  constructor() {
    this.dataSubject.next(this.data);
    this.copyDisplaySubject.next(this.copyData);
  }

  onClose(recordRemoved) {
    this.copyData =
      this.copyData.length > 0
        ? this.copyData.filter(item => item.ID !== recordRemoved.ID).map(
            items =>
              items.TeamOf
                ? {
                    ...items,
                    TeamOf: items.TeamOf.filter(
                      data => data.Leader !== recordRemoved.ID
                    )
                  }
                : { ...items }
          )
        : this.data.filter(item => item.ID !== recordRemoved.ID).map(
            items =>
              items.childData
                ? {
                    ...items,
                    TeamOf: items.childData.filter(
                      data => data.ID !== recordRemoved.ID
                    )
                  }
                : { ...items }
          );
    this.data = this.data.filter(item => item.ID !== recordRemoved.ID).map(
      items =>
        items.childData
          ? {
              ...items,
              childData: items.childData.filter(
                data => data.ID !== recordRemoved.ID
              )
            }
          : { ...items }
    );
    this.dataSubject.next(this.data);
    this.copyDisplaySubject.next(this.copyData);
  }
  onDropped(parentRecord, childRecord) {
    this.copyData =
      this.copyData.length > 0
        ? this.copyData.map(item => {
            return item.ID === childRecord.ID
              ? {
                  ...item,
                  TeamOf: item.childData
                    ? {
                        Leader: [...item.childData.ID, { ...parentRecord.ID }],
                        ProposedBy: 'Pugazh',
                        Action: 'Make Team'
                      }
                    : [
                        {
                          Leader: [...parentRecord.ID],
                          ProposedBy: 'Pugazh',
                          Action: 'Make Team'
                        }
                      ]
                }
              : item;
          })
        : this.data.map(item => {
            return item.ID === childRecord.ID
              ? {
                  ...item,
                  TeamOf: item.childData
                    ? {
                        Leader: [...item.childData.ID, { ...parentRecord.ID }],
                        ProposedBy: 'Pugazh',
                        Action: 'Make Team'
                      }
                    : [
                        {
                          Leader: [...parentRecord.ID],
                          ProposedBy: 'Pugazh',
                          Action: 'Make Team'
                        }
                      ]
                }
              : item;
          });
    this.data = this.data
      .map(
        item =>
          item.ID === parentRecord.ID
            ? {
                ...item,
                childData: item.childData
                  ? [...item.childData, { ...childRecord }]
                  : [{ ...childRecord }]
              }
            : item
      )
      .filter(data => data.ID !== childRecord.ID);
    this.dataSubject.next(this.data);
    this.copyDisplaySubject.next(this.copyData);
  }
}
