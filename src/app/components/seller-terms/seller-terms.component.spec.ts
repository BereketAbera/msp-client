import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerTermsComponent } from './seller-terms.component';

describe('SellerTermsComponent', () => {
  let component: SellerTermsComponent;
  let fixture: ComponentFixture<SellerTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
