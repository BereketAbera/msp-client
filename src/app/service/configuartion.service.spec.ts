import { TestBed } from '@angular/core/testing';

import { ConfiguartionService } from './configuartion.service';

describe('ConfiguartionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfiguartionService = TestBed.get(ConfiguartionService);
    expect(service).toBeTruthy();
  });
});
