import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { timer } from 'rxjs/observable/timer';
import { map, mapTo, switchMap, debounceTime, distinctUntilChanged, debounce } from 'rxjs/operators';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit {
  public passwordSent = false;
  public emailValid = false;
  public keyUp = new Subject<KeyboardEvent>();
  constructor(private authservice: AuthService, private router: Router) {
    const subscription = this.keyUp.pipe(
      map(event => event),
      debounceTime(100),
      distinctUntilChanged()
    )
      .subscribe((e: KeyboardEvent) => { this.isEmail((<HTMLInputElement>e.target).value); });
  }

  ngOnInit() {
  }

  isEmail(email: string) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.emailValid = re.test(email);
  }

  requestNewPassword(email: string) {
    this.authservice.requestForgottenPassword(email)
      .pipe(
      catchError(this.handleError())
      ).subscribe(a => { this.timeOutAndRedirect(); });
    this.passwordSent = true;

  }

  timeOutAndRedirect() {
    timer(3000).pipe(
    ).subscribe(act => {
      this.router.navigate(['']);
    });
  }
  private handleError() {
    return (err: any) => {
      return of({});
    };
  }
}
