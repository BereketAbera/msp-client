import { TestBed } from '@angular/core/testing';

import { AdminAssistantResolverService } from './admin-assistant-resolver.service';

describe('AdminAssistantResolverService', () => {
  let service: AdminAssistantResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAssistantResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
