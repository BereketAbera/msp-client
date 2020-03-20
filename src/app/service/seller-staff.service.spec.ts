import { TestBed } from '@angular/core/testing';

import { SellerStaffService } from './seller-staff.service';

describe('SellerStaffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellerStaffService = TestBed.get(SellerStaffService);
    expect(service).toBeTruthy();
  });
});
