import { TestBed } from '@angular/core/testing';

import { CategoryResolverService } from './category-resolver.service';

describe('CategoryResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryResolverService = TestBed.get(CategoryResolverService);
    expect(service).toBeTruthy();
  });
});
