import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  readonly IGNORE_VALUE = 'ignore';

  private subject1 = new Subject<string>();
  private subject2 = new Subject<string>();

  get observable1(): Observable<string> {
    return this.subject1.asObservable();
  }

  get observable2(): Observable<string> {
    return this.subject2.asObservable();
  }

  trigger1(value: string) {
    this.subject1.next(value);
  }

  trigger2(value: string) {
    this.subject2.next(value);
  }
}
