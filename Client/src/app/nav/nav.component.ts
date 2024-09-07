import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule,BsDropdownConfig  } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule,BsDropdownModule,RouterLink,RouterLinkActive,TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } },RouterLink]
})
export class NavComponent {
  accountService = inject(AccountService);
  route = inject(Router);
  toastrService = inject(ToastrService);
  baseUrl = this.accountService.baseUrl
  model: {
    username: string;
    password: string;
  } = {
    username: '',
    password: '',
  };

  login() {
    this.accountService.login(this.model).subscribe({
      next: _ =>  {
      this.route.navigateByUrl('/members');
      this.toastrService.success("Welcome "+this.model.username)
      },
      error: err=> this.toastrService.error(err.error),
      complete: ()=>console.log("Login Request is done")
    });
  }

  logOut(){
    this.toastrService.success("You've logged out");
    this.accountService.logOut();
    this.route.navigateByUrl("/");
    
  }
}
