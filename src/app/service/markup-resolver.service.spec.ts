import { TestBed } from '@angular/core/testing';

import { MarkupResolverService } from './markup-resolver.service';

describe('MarkupResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarkupResolverService = TestBed.get(MarkupResolverService);
    expect(service).toBeTruthy();
  });
});
