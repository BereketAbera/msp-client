import { TestBed } from '@angular/core/testing';

import { FeaturesResolverService } from './features-resolver.service';

describe('FeaturesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeaturesResolverService = TestBed.get(FeaturesResolverService);
    expect(service).toBeTruthy();
  });
});
