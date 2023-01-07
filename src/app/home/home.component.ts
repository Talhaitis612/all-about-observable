import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

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
        count++;
      }, 1000);
    });
    this.firstObsSubscription = customIntervalObservable.subscribe(({
      next:(count: any)=>{
        console.log(count);
      }
    }))
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
