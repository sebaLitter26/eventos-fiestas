import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, interval, pipe } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { GLOBAL } from './global';

@Injectable()
export class UserService {
  public identity;
  public token;
  public url: string;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  signup(user_to_login, gethash = null) {
    if (gethash != null) {
      user_to_login.gethash = gethash;
    }
    let json = JSON.stringify(user_to_login);
    let params = json;



    return this._http.post(this.url + 'login', params, { headers: this.headers })
    //.pipe(map(res => res.json()));
  }

  register(user_to_register) {
    let params = JSON.stringify(user_to_register);

    return this._http.post(this.url + 'register', params, { headers: this.headers })
    //.pipe(map(res => res.json()));
  }

  updateUser(user_to_update) {
    let params = JSON.stringify(user_to_update);

    this.headers.set('Authorization', this.getToken());

    return this._http.put(this.url + 'update-user/' + user_to_update._id,
      params, { headers: this.headers })
    //.pipe(map(res => res.json()));
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));

    if (identity != "undefined") {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token');

    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }

}