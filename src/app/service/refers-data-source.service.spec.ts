import { TestBed } from '@angular/core/testing';

import { RefersDataSourceService } from './refers-data-source.service';

describe('RefersDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefersDataSourceService = TestBed.get(RefersDataSourceService);
    expect(service).toBeTruthy();
  });
});
