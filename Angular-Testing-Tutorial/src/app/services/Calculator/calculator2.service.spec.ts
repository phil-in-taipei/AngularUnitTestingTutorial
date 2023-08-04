//import { TestBed } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { Calculator2Service } from './calculator2.service';
import { LoggerService } from '../Logger/logger.service';
//import { LoggerService } from '../Logger/logger.service';

describe('Calculator2Service', () => {
  let service: Calculator2Service;
  //let mockLoggerService: any;
  let loggerServiceSpy: jasmine.SpyObj<LoggerService>;

  beforeEach(() => {
    // one approach to 
    const mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
    //service = new Calculator2Service(mockLoggerService);
    TestBed.configureTestingModule({
      providers: [Calculator2Service, 
        { provide: LoggerService, useValue: mockLoggerService }
      ],
    });

    service = TestBed.inject(Calculator2Service);
    loggerServiceSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should multiply two numbers', () => {
    console.log('calling multiply');
    let result = service.multiply(2, 2);
    expect(result).toBe(4);
    // this way (below) if mockLoggerService: any delared at the top
    //expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
    // otherwise: this way:
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should divide two numbers', () => {
    console.log('calling divide');
    let result = service.divide(8, 2);
    expect(result).toBe(4);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });
});

