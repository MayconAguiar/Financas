import { TestBed, inject } from '@angular/core/testing';

import { MatchMediaService } from './match-media.service';

describe('MatchMediaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchMediaService]
    });
  });

  it('should be created', inject([MatchMediaService], (service: MatchMediaService) => {
    expect(service).toBeTruthy();
  }));
});
