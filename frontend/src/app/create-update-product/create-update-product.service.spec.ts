import { TestBed } from '@angular/core/testing';

import { CreateUpdateProductService } from './create-update-product.service';

describe('CreateUpdateProductService', () => {
  let service: CreateUpdateProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateUpdateProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
