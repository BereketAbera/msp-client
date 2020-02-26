import { TestBed } from '@angular/core/testing';

import { TransactionStatusResolverService } from './transaction-status-resolver.service';

describe('TransactionStatusResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionStatusResolverService = TestBed.get(TransactionStatusResolverService);
    expect(service).toBeTruthy();
  });
});
