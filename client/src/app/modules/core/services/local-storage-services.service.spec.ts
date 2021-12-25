/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocalStorageServicesService } from './local-storage-services.service';

describe('Service: LocalStorageServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageServicesService]
    });
  });

  it('should ...', inject([LocalStorageServicesService], (service: LocalStorageServicesService) => {
    expect(service).toBeTruthy();
  }));
});
