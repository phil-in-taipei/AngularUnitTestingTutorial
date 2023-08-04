import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService], // this line is optional for service w/o dependency??
    });
    // previously .inject was .get -> (deprecated)
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not have any messages when created', () => {
    expect(service.messages).toEqual([]);
  });

  it('should add a message when log is called', () => {
    service.log("message1");
    expect(service.messages).toEqual(['message1']);
  });

  it('should clear all messages when clear is called', () => {
    service.log("message1");
    service.log("message2");
    service.log("message3");
    service.clear();
    expect(service.messages).toEqual([]);
  });
});
