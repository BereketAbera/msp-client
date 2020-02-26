import { TestBed } from '@angular/core/testing';

import { CreditCardsResolverService } from './credit-cards-resolver.service';

describe('CreditCardsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreditCardsResolverService = TestBed.get(CreditCardsResolverService);
    expect(service).toBeTruthy();
  });
});
