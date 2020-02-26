import { TestBed } from '@angular/core/testing';

import { GalleryResolverService } from './gallery-resolver.service';

describe('GalleryResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GalleryResolverService = TestBed.get(GalleryResolverService);
    expect(service).toBeTruthy();
  });
});
