import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

    private authServiceUri = ':999/api/auth';
    private forgottenPasswordServiceUri = ':888/api/ForgottenPassword';
    constructor(private httpClient: HttpClient) {

    }

    public login(logInDetails: LoginDetails): Observable<any> {
        console.log(this.baseUri);
        return this.httpClient
            .post<User>(this.baseUri + this.authServiceUri, logInDetails);
    }

    public requestForgottenPassword(email: string) {
        console.log('sending ' + email);
        return this.httpClient
            .post(this.baseUri + this.forgottenPasswordServiceUri + '?email=' + email, null);
    }

    private get baseUri() {
        const getUrl = window.location;
        return getUrl.protocol + '//' + getUrl.hostname;
    }
}

export class LoginDetails {
    username: string;
    password: string;
}

export class User {
    fullname: string;
}

