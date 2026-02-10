import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlingService {
  httpNetworkError(message: string, error: Error): void {
    console.log(message);
    //alert(message);
  }
}
