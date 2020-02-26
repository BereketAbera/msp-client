import { TestBed } from '@angular/core/testing';

import { DailySalesDataSourceService } from './daily-sales-data-source.service';

describe('DailySalesDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DailySalesDataSourceService = TestBed.get(DailySalesDataSourceService);
    expect(service).toBeTruthy();
  });
});
