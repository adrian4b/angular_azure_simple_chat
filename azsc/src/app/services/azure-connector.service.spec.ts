import { TestBed, inject } from '@angular/core/testing';

import { AzureConnectorService } from './azure-connector.service';

describe('AzureConnectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AzureConnectorService]
    });
  });

  it('should be created', inject([AzureConnectorService], (service: AzureConnectorService) => {
    expect(service).toBeTruthy();
  }));
});
