import { TestBed } from '@angular/core/testing';

import { ShopResolverService } from './shop-resolver.service';

describe('ShopResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopResolverService = TestBed.get(ShopResolverService);
    expect(service).toBeTruthy();
  });
});
