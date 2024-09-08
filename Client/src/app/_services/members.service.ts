import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { AccountService } from './account.service';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  accountService = inject(AccountService);

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + "users");
  }

  getMember(username:string) {
    return this.http.get<Member>(this.baseUrl + "users/" + username);
  }

  updatMember(member:any){
    return this.http.put(this.baseUrl + "users",member);
  }
  // getHttpOption(){
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: `Bearer ${this.accountService.currentUser()?.token}`
  //     })
  //   }
  // }
}
