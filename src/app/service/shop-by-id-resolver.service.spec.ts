import { TestBed } from '@angular/core/testing';

import { ShopByIdResolverService } from './shop-by-id-resolver.service';

describe('ShopByIdResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopByIdResolverService = TestBed.get(ShopByIdResolverService);
    expect(service).toBeTruthy();
  });
});
