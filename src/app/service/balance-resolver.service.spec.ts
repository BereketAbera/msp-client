import { TestBed } from '@angular/core/testing';

import { BalanceResolverService } from './balance-resolver.service';

describe('BalanceResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BalanceResolverService = TestBed.get(BalanceResolverService);
    expect(service).toBeTruthy();
  });
});
