import { TestBed, inject } from '@angular/core/testing';

import { HeroSearchService } from './herosearch.service';

describe('HeroSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroSearchService]
    });
  });

  it('should be created', inject([HeroSearchService], (service: HerosearchService) => {
    expect(service).toBeTruthy();
  }));
});
