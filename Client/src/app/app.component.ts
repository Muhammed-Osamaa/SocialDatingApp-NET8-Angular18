import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'Client';
  http = inject(HttpClient);
  users:any;
  private accountService = inject(AccountService);
  getUser(){
    this.http.get("https://localhost:5001/api/users").subscribe({
      next:(response)=>this.users = response,
      error:(error) => console.log(error),
      complete:() => console.log("request is done")
    })
  }
  setCurrentUser(){
    const userString = localStorage.getItem("user");
    if(userString){
      this.accountService.currentUser.set(JSON.parse(userString));
    }else{
      return;
    }
  }
  ngOnInit(): void {
    this.getUser();
    this. setCurrentUser();
  }
}
