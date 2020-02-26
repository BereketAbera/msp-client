import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeWithSavedCreditCardComponent } from './deposite-with-saved-credit-card.component';

describe('DepositeWithSavedCreditCardComponent', () => {
  let component: DepositeWithSavedCreditCardComponent;
  let fixture: ComponentFixture<DepositeWithSavedCreditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositeWithSavedCreditCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositeWithSavedCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
