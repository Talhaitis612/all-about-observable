import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter, interval, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription!: Subscription;
  constructor() {}

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe({
    //   next: (count) => {
    //     console.log(count);
    //   },
    // });
    const customIntervalObservable = Observable.create((observer: any) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error('Count is greater than 3');
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable
      .pipe(
        filter((data:number)=>{
          return data>0;
        }),
        map((data: number) => {
          return 'Round: ' + data;
        })
      )
      .subscribe({
        next: (count: any) => {
          console.log(count);
        },
        error: (err: any) => {
          alert(err);
        },
        complete: () => {
          console.log('Completed!');
        },
      });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
