import { Component, inject, NgModule, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryModule } from 'ng-gallery';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, GalleryModule ,TitleCasePipe,FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit{
 
  member?:Member;
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);

  ngOnInit(): void {
   this. loadMember();
  }
  loadMember(){
    const username = this.accountService.currentUser();
    if(!username) return;
    this.memberService.getMember(username.username).subscribe({
      next:next => this.member = next
    });
  }
}
