import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, share } from 'rxjs/operators';


interface LoginResult {
  accessToken: string;
}

interface LoginError {
  error: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {



  constructor(private httpClient: HttpClient, private router: Router) { }

  private authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private token: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private loginError: BehaviorSubject<string> = new BehaviorSubject('');
  private registerError: BehaviorSubject<string> = new BehaviorSubject('');
  private isLogin: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private apiUrl = 'http://localhost:4000';

  public logIn(token: string): void {
    this.token.next(token);
    this.authenticated.next(true);
    this.loginError.next('');
  }

  public logOut(): void {
    this.token.next('');
    this.authenticated.next(false);
    this.router.navigate(['/']);
  }

  public isLoggedIn(): BehaviorSubject<boolean> {
    return this.authenticated;
  }
  public getToken(): BehaviorSubject<string> {
    return this.token;
  }

  public currentLoginError(): BehaviorSubject<string> {
    return this.loginError;
  }

  public currentRegisterError(): BehaviorSubject<string> {
    return this.registerError;
  }

  public isLoginPage(): BehaviorSubject<boolean> {
    return this.isLogin;
  }

  public changeToRegister() {
    console.log('Changing');
    this.isLogin.next(false);
  }

  public changeToLogin() {
    this.isLogin.next(true);
  }

  attemptLogin(email: string, password: string): void {
    console.log('Attempting login');
    this.httpClient.post<LoginError | LoginResult>(`${this.apiUrl}/login`, {
      email, password
    }).pipe(map(value => {
      if (this.isLoginResult(value)) {
        console.log('Logged in!');
        this.logIn(value.accessToken);
      }
    }), catchError(this.handleError('login')), share()).subscribe(_ => _);
  }

  attemptLogout() {
    console.log('Attempting logout');
    // this.httpClient.post<LoginError | LoginResult>(`${this.apiUrl}/logout`).pipe(map(value => {
    //   if (this.isLoginResult(value)) {
    //     console.log('Logged in!');
    //     this.logIn(value.accessToken);
    //   }
    // }), catchError(this.handleError('login')), share()).subscribe(_ => _);
    this.logOut();
  }

  attemptRegister(email: string, password: string, firstName: string, lastName: string) {
    console.log('Attempting register');
    this.httpClient.post<LoginError | LoginResult>(`${this.apiUrl}/register`, {
      email, password, firstName, lastName
    }).pipe(map(value => {
      if (this.isLoginResult(value)) {
        console.log('Logged in!');
        this.logIn(value.accessToken);
      }
    }), catchError(this.handleError('register')), share()).subscribe(_ => _);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (this.isLoginError(error.error)) {
        if (operation === 'login') {
          this.loginError.next(error.error.message);
        }
        else {
          this.registerError.next(error.error.message);
        }
      }
      return of(result as T);
    };
  }

  private isLoginResult(val: any): val is LoginResult { return 'accessToken' in val; }
  private isLoginError(val: any): val is LoginError { return 'message' in val; }
}
