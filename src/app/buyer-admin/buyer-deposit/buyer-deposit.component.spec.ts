import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerDepositComponent } from './buyer-deposit.component';

describe('BuyerDepositComponent', () => {
  let component: BuyerDepositComponent;
  let fixture: ComponentFixture<BuyerDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerDepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
