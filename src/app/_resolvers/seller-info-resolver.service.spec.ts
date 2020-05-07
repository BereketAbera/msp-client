import { TestBed } from '@angular/core/testing';

import { SellerInfoResolverService } from './seller-info-resolver.service';

describe('SellerInfoResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellerInfoResolverService = TestBed.get(SellerInfoResolverService);
    expect(service).toBeTruthy();
  });
});
