import { TestBed } from '@angular/core/testing';

import { UpdateWarehouseResolver } from './update-warehouse.resolver';

describe('UpdateWarehouseResolver', () => {
  let resolver: UpdateWarehouseResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UpdateWarehouseResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
