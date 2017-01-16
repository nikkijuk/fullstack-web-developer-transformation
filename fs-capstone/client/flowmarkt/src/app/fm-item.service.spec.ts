/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FmItemService } from './fm-item.service';

describe('FmItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FmItemService]
    });
  });

  it('should ...', inject([FmItemService], (service: FmItemService) => {
    expect(service).toBeTruthy();
  }));
});
