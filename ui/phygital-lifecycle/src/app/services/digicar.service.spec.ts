import { TestBed } from '@angular/core/testing';

import { DigicarService } from './digicar.service';

describe('DigicarService', () => {
  let service: DigicarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigicarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
