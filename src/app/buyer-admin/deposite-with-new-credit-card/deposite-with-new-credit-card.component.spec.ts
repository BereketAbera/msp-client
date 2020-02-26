import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeWithNewCreditCardComponent } from './deposite-with-new-credit-card.component';

describe('DepositeWithNewCreditCardComponent', () => {
  let component: DepositeWithNewCreditCardComponent;
  let fixture: ComponentFixture<DepositeWithNewCreditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositeWithNewCreditCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositeWithNewCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
