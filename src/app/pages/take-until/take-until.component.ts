import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, mergeMap, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-take-until',
  templateUrl: 'take-until.component.html',
  styleUrls: ['take-until.component.scss']
})
export class TakeUntilComponent implements OnInit, OnDestroy {

  private isDestroyed$ = new Subject<boolean>();

  constructor(
    private appService: AppService,
  ) {
  }

  ngOnInit() {
    this.appService.observable1.pipe(
      tap(value => {
        console.log('TakeUntilComponent: tap: ' + value);
      }),
      filter(value => value !== this.appService.IGNORE_VALUE),
      // switchMap(() => this.appService.observable2),
      takeUntil(this.isDestroyed$),
      // switchMap(() => this.appService.observable2), // memory leak, never unsubscribed!
    ).subscribe(value => {
      console.log('TakeUntilComponent: subscribe: ' + value);
    }, error => {
      console.log('TakeUntilComponent: error: ' + error);
    }, () => {
      console.log('TakeUntilComponent: complete');
    });
  }

  ngOnDestroy() {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

}
