import { TestBed } from '@angular/core/testing';

import { DisneyApiService } from './disney-api';

describe('DisneyApi', () => {
  let service: DisneyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisneyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
