
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'fake site';
  public loginError = false;
  constructor(private authservice: AuthService, private router: Router) { }

  public login(username: string, password: string) {
    this.authservice.login({ username: username, password: password })
      .pipe(
      tap(data => {
        this.loginError = false;
        this.redirectToHome();
      }),
      catchError(this.handleError())
      ).subscribe(a => { console.log(a); });
  }

  private redirectToRequestPasword() {
    this.router.navigate(['forgottenPassword']);
  }

  private redirectToHome() {
    this.router.navigate(['home']);
  }

  private handleError() {
    return (err: any) => {
      this.loginError = true;
      return of({});
    };
  }
}

