import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  currentUser = signal<User | null>(null);

  login(model: { username: string; password: string }) {    
    return this.http.post<User>(this.baseUrl + `account/login`, model).pipe(
      map(user=> {
        if(user) {              
          this.currentUser.set(user);
          localStorage.setItem("user",JSON.stringify(user));
        }else{
          console.log("RXJS can't hold a user");
        }
      })
    );
  }


  register(model: { username: string; password: string }) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user=> {
        if(user) {     
          this.currentUser.set(user);
          localStorage.setItem("user",JSON.stringify(user));
        }else{
          console.log("RXJS can't hold a user");
        }
        return user;
      })
    );
  }

  logOut() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }
}
