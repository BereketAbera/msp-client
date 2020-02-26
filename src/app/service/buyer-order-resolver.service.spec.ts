import { TestBed } from '@angular/core/testing';

import { BuyerOrderResolverService } from './buyer-order-resolver.service';

describe('BuyerOrderResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuyerOrderResolverService = TestBed.get(BuyerOrderResolverService);
    expect(service).toBeTruthy();
  });
});
