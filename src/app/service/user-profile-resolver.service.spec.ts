import { TestBed } from '@angular/core/testing';

import { UserProfileResolverService } from './user-profile-resolver.service';

describe('UserProfileResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserProfileResolverService = TestBed.get(UserProfileResolverService);
    expect(service).toBeTruthy();
  });
});
