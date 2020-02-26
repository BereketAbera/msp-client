import { TestBed } from '@angular/core/testing';

import { ProductsDataSourceService } from './products-data-source.service';

describe('ProductsDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductsDataSourceService = TestBed.get(ProductsDataSourceService);
    expect(service).toBeTruthy();
  });
});
