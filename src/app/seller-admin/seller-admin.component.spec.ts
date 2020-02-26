import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAdminComponent } from './seller-admin.component';

describe('SellerAdminComponent', () => {
  let component: SellerAdminComponent;
  let fixture: ComponentFixture<SellerAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
