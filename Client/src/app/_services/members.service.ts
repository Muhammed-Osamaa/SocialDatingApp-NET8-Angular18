import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, OnInit, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { AccountService } from './account.service';
import { NgForm } from '@angular/forms';
import { map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  accountService = inject(AccountService);
  members = signal<Member[]>([]);

  getMembers() {
    this.http.get<Member[]>(this.baseUrl + 'users').subscribe({
      next: (members) => this.members.set(members),
      error: (err) => console.log('Error in Fetch users'),
      complete: () => console.log('Request has done'),
    });
  }

  getMember(username: string) {
    if (this.members().length > 0) {
      const member = this.members().find((x) => x.username === username);
      if (member !== undefined) return of(member);
    }
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  //note i don't know what's happing but signal gets update without update signals :D
  updatMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      tap(_ => {
        this.members.update(members =>  members.map(x => x.username === member.username?member:x));
      })
    )

  }


  // getHttpOption(){
    //   return {
    //     headers: new HttpHeaders({
    //       Authorization: `Bearer ${this.accountService.currentUser()?.token}`
    //     })
    //   }
    // }
}
