import { TestBed } from '@angular/core/testing';

import { MspMarkupResolverService } from './msp-markup-resolver.service';

describe('MspMarkupResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MspMarkupResolverService = TestBed.get(MspMarkupResolverService);
    expect(service).toBeTruthy();
  });
});
