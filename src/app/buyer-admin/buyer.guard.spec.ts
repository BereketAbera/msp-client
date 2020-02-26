import { TestBed, async, inject } from '@angular/core/testing';

import { BuyerGuard } from './buyer.guard';

describe('BuyerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuyerGuard]
    });
  });

  it('should ...', inject([BuyerGuard], (guard: BuyerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
