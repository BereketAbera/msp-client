import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerTransactionsComponent } from './buyer-transactions.component';

describe('BuyerTransactionsComponent', () => {
  let component: BuyerTransactionsComponent;
  let fixture: ComponentFixture<BuyerTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
