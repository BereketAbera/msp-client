import { TestBed } from '@angular/core/testing';

import { RevenuRprtResolverService } from './revenu-rprt-resolver.service';

describe('RevenuRprtResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RevenuRprtResolverService = TestBed.get(RevenuRprtResolverService);
    expect(service).toBeTruthy();
  });
});
