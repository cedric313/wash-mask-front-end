import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './user.service';
import {Observable} from 'rxjs';
import {Mask} from '../Mask';



@Injectable({
  providedIn: 'root'
})
export class MaskService {
  //urlBack = "http://localhost:8082/";
  urlBack = 'https://mask-wash-back-end.herokuapp.com/';
  idMemberFamilyToCreateMask: number;

  mask = {
    id:"-1",
    email: "",
    password:"",
    pseudo:"",
    family: [
      {}
    ],
  };

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  createMask(id: number, mask: Mask): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.httpClient.post(this.urlBack + "family_members/" + id + "/" + "mask",mask, {headers});
  }

  findMaskByMember(id: number): Observable<any>{
    return this.httpClient.get(this.urlBack + "mask/" + id);
  }

  addWashToMask(id: number): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.httpClient.put(this.urlBack + "mask/" + id + "/" + "wash",{} , {headers});
  }

  sousWashToMask(id: number): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.httpClient.put(this.urlBack + "mask/" + id + "/" + "diswash",{} , {headers});
  }

  deleteMask(id: number): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.httpClient.delete(this.urlBack + "mask/" + id,{responseType: 'text'});
  }


}
