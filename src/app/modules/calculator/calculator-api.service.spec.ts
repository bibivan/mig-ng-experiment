import { TestBed } from '@angular/core/testing';

import { CalculatorApiService } from './calculator-api.service';

describe('CalculatorApiService', () => {
  let service: CalculatorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
