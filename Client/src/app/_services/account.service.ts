import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  url = 'https://localhost:5001/api/';
  currentUser = signal<User | null>(null);

  login(model: { username: string; password: string }) {
    return this.http.post<User>(this.url + 'account/login', model).pipe(
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
    return this.http.post<User>(this.url + 'account/register', model).pipe(
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
