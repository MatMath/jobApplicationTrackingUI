import { Component, Input } from '@angular/core';

@Component({
  selector: 'sorting-order',
  template: `
    <span *ngIf="orderby !== comparable"><i class="fas fa-arrows-alt-v"></i></span>
    <span *ngIf="orderby === comparable && order"><i class="fas fa-arrow-down"></i></span>
    <span *ngIf="orderby === comparable && !order"><i class="fas fa-arrow-up"></i></span>
  `,
})
export class SortingOrder {
  @Input() order: boolean;
  @Input() orderby: string;
  @Input() comparable: string;
}
