import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: 'unsubscribe.component.html',
  styleUrls: ['unsubscribe.component.scss']
})
export class UnsubscribeComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    private appService: AppService,
  ) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.appService.observable1.pipe(
        tap(value => {
          console.log('UnsubscribeComponent: tap: ' + value);
        }),
        filter(value => value !== this.appService.IGNORE_VALUE),
        // switchMap(() => this.appService.observable2),
        // mergeMap(() => this.appService.observable2), // it's collecting all previous calls and call them at once!
      ).subscribe(value => {
        console.log('UnsubscribeComponent: subscribe: ' + value);
      }, error => {
        console.log('UnsubscribeComponent: error: ' + error);
      }, () => {
        console.log('UnsubscribeComponent: complete');
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }
}
