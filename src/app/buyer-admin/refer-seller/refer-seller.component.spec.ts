import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferSellerComponent } from './refer-seller.component';

describe('ReferSellerComponent', () => {
  let component: ReferSellerComponent;
  let fixture: ComponentFixture<ReferSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
