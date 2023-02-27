import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { Observable, throwError } from 'rxjs';
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
  url: string = 'http://localhost:8000/auth';
  apiUrlLogin = 'http://localhost:8000/auth/login';
  apiUrlRegister = 'http://localhost:8000/auth/signup';
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
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
