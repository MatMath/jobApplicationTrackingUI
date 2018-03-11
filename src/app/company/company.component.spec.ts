import { TestBed, async } from '@angular/core/testing';
import { CompanyComponent } from './company.component';

describe('Company.component', () => {
  let ctrl: CompanyComponent;

  beforeEach(() => {
    const notificationServiceSpy = jasmine.createSpyObj('NotificationsService', ['error', 'remove', 'success']);
    const genericServiceSpy = jasmine.createSpyObj('GenericService', ['getCompanyList', 'getRecrutersList']);
    const companyServiceSpy = jasmine.createSpyObj('CompanyService', ['deleteCieId', 'saveCie', 'deleteRecruId', 'saveRecru']);
    const ngbModalSpy = jasmine.createSpyObj('NgbModal', ['open']);
    ctrl = new CompanyComponent(notificationServiceSpy, genericServiceSpy, companyServiceSpy, ngbModalSpy);
  })

  it('Should have the component defined', () => {
    expect(ctrl).toBeDefined();
    expect(ctrl.listView).toBeDefined();
  });
});
