import { TestBed } from '@angular/core/testing';
import { Calculator2Service } from './calculator2.service';
//import { LoggerService } from '../Logger/logger.service';

describe('Calculator2Service', () => {
  let service: Calculator2Service;
  let mockLoggerService: any;

  beforeEach(() => {
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
    service = new Calculator2Service(mockLoggerService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should multiply two numbers', () => {
    console.log('calling multiply');
    let result = service.multiply(2, 2);
    expect(result).toBe(4);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });
});

