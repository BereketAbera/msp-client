import { TestBed } from '@angular/core/testing';

import { TransactionDataSourceService } from './transaction-data-source.service';

describe('TransactionDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionDataSourceService = TestBed.get(TransactionDataSourceService);
    expect(service).toBeTruthy();
  });
});
