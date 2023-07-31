import { Injectable } from '@angular/core';
import { LoggerService } from '../Logger/logger.service';


@Injectable({
  providedIn: 'root'
})
export class Calculator2Service {

  constructor(private loggerService: LoggerService) { }

  divide(n1: number, n2: number): number {
    this.loggerService.log("Divide operation is being called");
    return n1 / n2;
  }

  multiply(n1: number, n2: number): number {
    this.loggerService.log("Multiply operation is being called");
    return n1 * n2;
  }
}
