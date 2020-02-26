import { TestBed } from '@angular/core/testing';

import { SubCategoryResolverService } from './sub-category-resolver.service';

describe('SubCategoryResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubCategoryResolverService = TestBed.get(SubCategoryResolverService);
    expect(service).toBeTruthy();
  });
});
