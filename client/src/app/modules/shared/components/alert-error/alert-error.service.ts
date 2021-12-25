import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AlertErrorService {
  alertError = new Subject<boolean>();
  alertErrorWithMessageFromApi = new Subject<string>();
  
}
