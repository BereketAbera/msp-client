import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStaffAccessComponent } from './manage-staff-access.component';

describe('ManageStaffAccessComponent', () => {
  let component: ManageStaffAccessComponent;
  let fixture: ComponentFixture<ManageStaffAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageStaffAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStaffAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
