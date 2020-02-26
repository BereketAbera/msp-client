import { TestBed } from '@angular/core/testing';

import { BuyerTransactionsDataSourceService } from './buyer-transactions-data-source.service';

describe('BuyerTransactionsDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuyerTransactionsDataSourceService = TestBed.get(BuyerTransactionsDataSourceService);
    expect(service).toBeTruthy();
  });
});
