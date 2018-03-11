import { TestBed, async } from '@angular/core/testing';
import { CompanyComponent } from './company.component';

describe('Company.component', () => {
  let ctrl: CompanyComponent;
  const notificationServiceSpy = jasmine.createSpyObj('NotificationsService', ['error', 'remove', 'success']);
  const genericServiceSpy = jasmine.createSpyObj('GenericService', ['getCompanyList', 'getRecrutersList']);
  const companyServiceSpy = jasmine.createSpyObj('CompanyService', ['deleteCieId', 'saveCie', 'deleteRecruId', 'saveRecru']);
  const ngbModalSpy = jasmine.createSpyObj('NgbModal', ['open']);

  beforeEach(() => {
    companyServiceSpy.deleteCieId.and.returnValue(Promise.resolve('good'));
    ctrl = new CompanyComponent(notificationServiceSpy, genericServiceSpy, companyServiceSpy, ngbModalSpy);
  })

  it('Should have the component defined', () => {
    expect(ctrl).toBeDefined();
    expect(ctrl.listView).toBeDefined();
  });

  it('initial variables', () => {
    expect(ctrl.emptyCie).toBeDefined();
    expect(ctrl.showList).toBe(true);
    expect(ctrl.showCie).toBe(false);
    expect(ctrl.showRecruters).toBe(false);
    expect(ctrl.submitting).toBe(false);
  });

  it('#listView', () => {
    ctrl.showList = false; // before click (on by default)
    ctrl.listView();
    expect(ctrl.showList).toBe(true, 'Visible after click');
  });

  it('#newCie', () => {
    ctrl.newCie(true);
    expect(ctrl.showCie).toBe(true);
    expect(ctrl.activeCie).toEqual(ctrl.emptyCie, 'reset the Cie');
    expect(ctrl.activeRecruters).toEqual(ctrl.emptyRecruters, 'reset the Recruters');
    // Validate that we do not modify the initial Value
    ctrl.activeCie.location = 'Montreal';
    ctrl.activeRecruters.name = 'Marvel';
    expect(ctrl.activeCie).not.toEqual(ctrl.emptyCie, 'Default Cie');
    expect(ctrl.activeRecruters).not.toEqual(ctrl.emptyRecruters, 'Default Recruters');
  });

  it('#deleteCieId', () => {
    ctrl.activeCie.location = 'NYC';
    ctrl.deleteCieId(42);
    expect(companyServiceSpy.deleteCieId).toHaveBeenCalledWith(42);
    expect(ctrl.activeCie).toEqual(ctrl.emptyCie, 'reset the Cie');
  });

});
