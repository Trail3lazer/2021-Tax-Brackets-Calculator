import { TestBed } from '@angular/core/testing';

import { JointService } from './joint.service';

describe('JointCalculatorServiceService', () => {
  let service: JointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
