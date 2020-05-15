import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../User';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlBack = "http://localhost:8082/";
  urlToCreateAccount = "user";
  urlToSigin = "user/connect";
  user = {
    id:"-1",
    email: "",
    password:"",
    pseudo:"",
    familyMembers: [
      {}
    ],
  };

  constructor(private httpClient: HttpClient) { }

  createAccount(user: User): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.httpClient.post(this.urlBack + this.urlToCreateAccount,user, {headers});
  }

  signIn(user: User): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.httpClient.post(this.urlBack + this.urlToSigin,user,{headers});
  }

}
