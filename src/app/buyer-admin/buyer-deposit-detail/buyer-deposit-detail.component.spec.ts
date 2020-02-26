import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerDepositDetailComponent } from './buyer-deposit-detail.component';

describe('BuyerDepositDetailComponent', () => {
  let component: BuyerDepositDetailComponent;
  let fixture: ComponentFixture<BuyerDepositDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerDepositDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerDepositDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
