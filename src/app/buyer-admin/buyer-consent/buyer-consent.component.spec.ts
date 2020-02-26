import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerConsentComponent } from './buyer-consent.component';

describe('BuyerConsentComponent', () => {
  let component: BuyerConsentComponent;
  let fixture: ComponentFixture<BuyerConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerConsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
