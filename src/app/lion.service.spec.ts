
import { TestBed } from '@angular/core/testing';

import { LionService } from './lion.service';

describe('LionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LionService = TestBed.get(LionService);
    expect(service).toBeTruthy();
  });
});
