import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FamilyMembers} from '../FamilyMembers';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FamilymembersService {
  //urlBack = "http://localhost:8082/";
  urlBack = 'https://mask-wash-back-end.herokuapp.com/';

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

  deleteMember(id: number): Observable<any>{
    return this.httpClient.delete(this.urlBack + "family_members/delete/" + id,{responseType: 'text'});
  }

  getFirstName(id: number): Observable<any>{
    return this.httpClient.get(this.urlBack + "family_members/first_name/" + id,{responseType: 'text'});

  }
}
