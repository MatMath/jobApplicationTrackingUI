import {Component, Input} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './confirmModal.component.html',
})
export class NgbdModalContent {
  @Input() id: string;
  @Input() name: string;
  @Input() description: string;
  @Input() callback: Function;

  constructor(public activeModal: NgbActiveModal) {}
}
