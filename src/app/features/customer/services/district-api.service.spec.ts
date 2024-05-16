import { TestBed } from '@angular/core/testing';

import { DistrictApiService } from './district-api.service';

describe('DistrictApiService', () => {
  let service: DistrictApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistrictApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
