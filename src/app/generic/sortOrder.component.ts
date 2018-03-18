import { Component, Input } from '@angular/core';

@Component({
  selector: 'sorting-order',
  template: `
    <i class="fa fa-arrows-v" *ngIf="orderby !== comparable"></i>
    <i class="fa fa-arrow-down" *ngIf="orderby === comparable && order"></i>
    <i class="fa fa-arrow-up" *ngIf="orderby === comparable && !order"></i>
  `,
})
export class SortingOrder {
  @Input() order: boolean;
  @Input() orderby: string;
  @Input() comparable: string;
}
