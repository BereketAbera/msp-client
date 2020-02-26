import { TestBed } from '@angular/core/testing';

import { SellerOrderResolverService } from './seller-order-resolver.service';

describe('SellerOrderResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellerOrderResolverService = TestBed.get(SellerOrderResolverService);
    expect(service).toBeTruthy();
  });
});
