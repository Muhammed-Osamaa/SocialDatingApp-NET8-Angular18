import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  url = 'https://localhost:5001/api/';
  currentUser = signal<User | null>(null);

  login(model: { username: string; password: string }) {
    return this.http.post(this.url + 'account/login', model);
  }
}
