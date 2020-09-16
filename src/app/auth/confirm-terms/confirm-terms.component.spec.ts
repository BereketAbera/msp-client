import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTermsComponent } from './confirm-terms.component';

describe('ConfirmTermsComponent', () => {
  let component: ConfirmTermsComponent;
  let fixture: ComponentFixture<ConfirmTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
