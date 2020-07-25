import { TestBed } from '@angular/core/testing';

import { OnlineShoppingManagementService } from './online-shopping-management.service';

describe('OnlineShoppingManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlineShoppingManagementService = TestBed.get(OnlineShoppingManagementService);
    expect(service).toBeTruthy();
  });
});
