import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit{
  private membersService = inject(MembersService);
  members!:Member[];

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.membersService.getMembers().subscribe({
      next:members=>this.members = members,
      error:err=> console.log("Error in Fetch users"),
      complete:()=>console.log("Request has done")
    })
  }
}
