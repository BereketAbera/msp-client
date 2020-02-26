import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerItemQrcodeComponent } from './buyer-item-qrcode.component';

describe('BuyerItemQrcodeComponent', () => {
  let component: BuyerItemQrcodeComponent;
  let fixture: ComponentFixture<BuyerItemQrcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerItemQrcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerItemQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
