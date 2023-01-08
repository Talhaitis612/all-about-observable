import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user/user.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  activated = false;
  private activatedSub!: Subscription;
  constructor(private userService: UserService) {
    this.activatedSub = this.userService.activatedEmitter.subscribe({
      next: (didActivate: boolean) => {
        if (didActivate) {
          this.activated = didActivate;
        }
      },
    });
  }

  ngOnInit() {}
  ngOnDestroy(): void {
    this.activatedSub.unsubscribe();
  }
}
