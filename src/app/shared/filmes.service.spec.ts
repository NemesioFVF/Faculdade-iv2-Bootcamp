import { TestBed } from '@angular/core/testing';
import { filmesService } from './filmes.service';

describe('filmesService', () => {
  let service: filmesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(filmesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
