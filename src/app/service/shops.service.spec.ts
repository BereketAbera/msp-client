import { TestBed } from '@angular/core/testing';

import { ShopsService } from './shops.service';

describe('ShopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopsService = TestBed.get(ShopsService);
    expect(service).toBeTruthy();
  });
});
