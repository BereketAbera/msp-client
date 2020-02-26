import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerAdminComponent } from './buyer-admin.component';

describe('BuyerAdminComponent', () => {
  let component: BuyerAdminComponent;
  let fixture: ComponentFixture<BuyerAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
