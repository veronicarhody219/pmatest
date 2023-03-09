import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'https://pmabackend.onrender.com/auth';
  apiUrlLogin = 'https://pmabackend.onrender.com/auth/login';
  apiUrlRegister = 'https://pmabackend.onrender.com/auth/signup';
  // url: string = 'http://localhost:8000/auth';
  // apiUrlLogin = 'http://localhost:8000/auth/login';
  // apiUrlRegister = 'http://localhost:8000/auth/signup';
  private _currentUser: BehaviorSubject<boolean | any> = new BehaviorSubject(
    null
  );
  constructor(private http: HttpClient, private router: Router) {}
  login(userCred: any) {
    return this.http.post(this.apiUrlLogin, userCred);
  }
  register(userCred: any) {
    return this.http
      .post(this.apiUrlRegister, userCred)
      .pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getEmail() {
    return localStorage.getItem('email');
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.router.navigate(['login']);
  }
}
