import { TestBed } from '@angular/core/testing';
import { MystoreFormService } from './mystore-form.service';


describe('MystoreFormServiceService', () => {
  let service: MystoreFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MystoreFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
