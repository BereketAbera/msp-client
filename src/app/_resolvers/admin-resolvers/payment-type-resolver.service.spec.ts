import { TestBed } from '@angular/core/testing';

import { PaymentTypeResolverService } from './payment-type-resolver.service';

describe('PaymentTypeResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentTypeResolverService = TestBed.get(PaymentTypeResolverService);
    expect(service).toBeTruthy();
  });
});
