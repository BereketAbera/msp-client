import { TestBed } from '@angular/core/testing';

import { OrderDataSourceService } from './order-data-source.service';

describe('OrderDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderDataSourceService = TestBed.get(OrderDataSourceService);
    expect(service).toBeTruthy();
  });
});
