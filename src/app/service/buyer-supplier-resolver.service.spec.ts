import { TestBed } from '@angular/core/testing';

import { BuyerSupplierResolverService } from './buyer-supplier-resolver.service';

describe('BuyerSupplierResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuyerSupplierResolverService = TestBed.get(BuyerSupplierResolverService);
    expect(service).toBeTruthy();
  });
});
