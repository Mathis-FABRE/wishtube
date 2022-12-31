import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:1337/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string, roles: string[]): Observable<any> {
    if (roles.length === 0) {
      return this.http.post(AUTH_API + 'signup', {
        username,
        email,
        password
      }, httpOptions);
    } else {
      return this.http.post(AUTH_API + 'signup', {
        username,
        email,
        password,
        roles
      }, httpOptions);
    }
  }
}
