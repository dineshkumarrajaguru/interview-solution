import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from '../components/header/header.component';

import { HeaderService } from './header.service';

describe('HeaderService', () => {
  let headerService: HeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    headerService = TestBed.inject(HeaderService);
  });

  it('should be created', () => {
    expect(headerService).toBeTruthy();
  });

  it('should call set header title', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const headerComponentInstance = fixture.componentInstance;
    headerComponentInstance['subscribeToHeaderTitleChange']();
    headerService.setHeaderTitle('Testing Header Title');
    expect(headerComponentInstance.title).toEqual('Testing Header Title');
  });
});
