import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialReferralComponent } from './social-referral.component';

describe('SocialReferralComponent', () => {
  let component: SocialReferralComponent;
  let fixture: ComponentFixture<SocialReferralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialReferralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
