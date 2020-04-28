import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerTermsComponent } from './buyer-terms.component';

describe('BuyerTermsComponent', () => {
  let component: BuyerTermsComponent;
  let fixture: ComponentFixture<BuyerTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
