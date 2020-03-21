import { TestBed } from '@angular/core/testing';

import { StaffResolverService } from './staff-resolver.service';

describe('StaffResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StaffResolverService = TestBed.get(StaffResolverService);
    expect(service).toBeTruthy();
  });
});
