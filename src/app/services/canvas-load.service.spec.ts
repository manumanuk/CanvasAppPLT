import { TestBed } from '@angular/core/testing';

import { CanvasLoadService } from './canvas-load.service';

describe('CanvasLoadService', () => {
  let service: CanvasLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
