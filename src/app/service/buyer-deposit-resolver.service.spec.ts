import { TestBed } from '@angular/core/testing';

import { BuyerDepositResolverService } from './buyer-deposit-resolver.service';

describe('BuyerDepositResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuyerDepositResolverService = TestBed.get(BuyerDepositResolverService);
    expect(service).toBeTruthy();
  });
});
