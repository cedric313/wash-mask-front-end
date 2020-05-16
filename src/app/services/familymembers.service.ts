import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FamilyMembers} from '../FamilyMembers';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FamilymembersService {
  urlBack = "http://localhost:8082/";

  member = {
    id:"-1",
    email: "",
    password:"",
    pseudo:"",
    family: [
      {}
    ],
  };

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  createFamilyMember(member: FamilyMembers): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.httpClient.post(this.urlBack + "user/" + this.userService.user.id + "/" + "family_members",member, {headers});
  }

  findFamilyMembers(){
    return this.httpClient.get(this.urlBack + "user/" + this.userService.user.id);
  }
}
