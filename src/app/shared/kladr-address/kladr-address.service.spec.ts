import { TestBed } from '@angular/core/testing';

import { KladrAddressService } from './kladr-address.service';

describe('KladrAddressService', () => {
  let service: KladrAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KladrAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
