import { TestBed } from '@angular/core/testing';

import { ReferralLinkServiceService } from './referral-link-service.service';

describe('ReferralLinkServiceService', () => {
  let service: ReferralLinkServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferralLinkServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
