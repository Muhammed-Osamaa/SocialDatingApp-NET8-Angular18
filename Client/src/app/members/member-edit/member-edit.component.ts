import { Component, HostListener, inject, NgModule, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryModule } from 'ng-gallery';
import { TitleCasePipe } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, GalleryModule ,TitleCasePipe,FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit{
   @ViewChild("editForm") child?:NgForm;
   @HostListener("window:beforeunload" , ['$event']) notify($event:any){
    if(this.child?.dirty){
      $event.returnValue = true;
    }
  }
  member!:Member;
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private toastr = inject(ToastrService)

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

  updateMember() {  
    this.memberService.updatMember(this.member).subscribe({
      next:_ => {
        this.toastr.success("done");
        this.child?.reset(this.member);
      }
    })
  } 
}
