import { TestBed } from '@angular/core/testing';

import { UserFeaturesResolverService } from './user-features-resolver.service';

describe('UserFeaturesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserFeaturesResolverService = TestBed.get(UserFeaturesResolverService);
    expect(service).toBeTruthy();
  });
});
