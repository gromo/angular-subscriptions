import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, mergeMap, switchMap, takeWhile, tap } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-take-while',
  templateUrl: 'take-while.component.html',
  styleUrls: ['take-while.component.scss']
})
export class TakeWhileComponent implements OnInit, OnDestroy {

  private isAlive = true;

  constructor(
    private appService: AppService,
  ) {
  }

  ngOnInit() {
    this.appService.observable1.pipe(
      tap(value => {
        console.log('TakeWhileComponent: tap: ' + value);
      }),
      filter(value => value !== this.appService.IGNORE_VALUE),
      // switchMap(() => this.appService.observable2),
      takeWhile(() => this.isAlive),
      // switchMap(() => this.appService.observable2), // memory leak, never unsubscribed!
    ).subscribe(value => {
      console.log('TakeWhileComponent: subscribe: ' + value);
    }, error => {
      console.log('TakeWhileComponent: error: ' + error);
    }, () => {
      console.log('TakeWhileComponent: complete');
    });
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

}
