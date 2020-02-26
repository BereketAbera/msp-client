import { TestBed } from '@angular/core/testing';

import { SellerSummaryResolverService } from './seller-summary-resolver.service';

describe('SellerSummaryResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellerSummaryResolverService = TestBed.get(SellerSummaryResolverService);
    expect(service).toBeTruthy();
  });
});
