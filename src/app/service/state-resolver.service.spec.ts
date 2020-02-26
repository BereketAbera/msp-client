import { TestBed } from '@angular/core/testing';

import { StateResolverService } from './state-resolver.service';

describe('StateResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateResolverService = TestBed.get(StateResolverService);
    expect(service).toBeTruthy();
  });
});
