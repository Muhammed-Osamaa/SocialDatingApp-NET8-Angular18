import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule,BsDropdownConfig  } from 'ngx-bootstrap/dropdown';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule,BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavComponent {
  private accountService = inject(AccountService);
  loggedIn!:boolean;
  model: {
    username: string;
    password: string;
  } = {
    username: '',
    password: '',
  };

  login() {
    this.accountService.login(this.model).subscribe({
      next:respone =>  {
        console.log(respone)
        this.loggedIn = true
      },
      error: err=> console.log(err),
      complete: ()=>console.log("Login Request is done")
    });
  }

  logOut(){
    this.loggedIn = false;
  }
}
