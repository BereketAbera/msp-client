import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialReferralsComponent } from './social-referrals.component';

describe('SocialReferralsComponent', () => {
  let component: SocialReferralsComponent;
  let fixture: ComponentFixture<SocialReferralsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialReferralsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialReferralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
