import { TestBed } from '@angular/core/testing';

import { SocialReferralService } from './social-referral.service';

describe('SocialReferralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocialReferralService = TestBed.get(SocialReferralService);
    expect(service).toBeTruthy();
  });
});
