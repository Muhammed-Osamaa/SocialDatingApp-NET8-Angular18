import { Component, inject, input, OnInit, output } from '@angular/core';
import { Member } from '../../_models/member';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { AccountService } from '../../_services/account.service';
import { environment } from '../../../environments/environment';
import { Photo } from '../../_models/photo';
import { MembersService } from '../../_services/members.service';

@Component({
  selector: 'app-photo-edit',
  standalone: true,
  imports: [NgClass,NgFor,NgIf,NgStyle,FileUploadModule,DecimalPipe],
  templateUrl: './photo-edit.component.html',
  styleUrl: './photo-edit.component.css'
})
export class PhotoEditComponent implements OnInit {
  member= input.required<Member>();
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  uploader?:FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  memberChange = output<Member>();
  ngOnInit(): void {
    this.initializerUploader();
  }

  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  initializerUploader() {
    this.uploader = new FileUploader({
      url:this.baseUrl + "users/add-photo",
      authToken: 'Bearer '+this.accountService.currentUser()?.token,
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => file.withCredentials = false;
    this.uploader.onSuccessItem = (item,response,status,headers) => {
      const photo = JSON.parse(response);
      const updateMember = {...this.member()};
      updateMember.photos.push(photo);
      this.memberChange.emit(updateMember);
    }
  }

  setMainPhoto(photo:Photo) {
    this.memberService.setMainPohot(photo.id).subscribe({
      next: _ => {
        const user = this.accountService.currentUser();
        if(user) {
          user.photoUrl = photo.url;
          this.accountService.setCurrentUser(user);
        }
        const newUser = {...this.member()};
        newUser.photoUrl = photo.url;
        newUser.photos.forEach(x => {
          if(x.isMain) x.isMain = false;
          if(x.id === photo.id) x.isMain = true;
        })
        this.memberChange.emit(newUser);
      }
    })
  }

  deletePhoto(photo:Photo){
    this.memberService.deletePhoto(photo.id).subscribe({
      next:_ => {
        const newUser = {...this.member()};
        const arr = newUser.photos.filter(x => x.id != photo.id);
        newUser.photos = arr;
        this.memberChange.emit(newUser);
      }
    })
  }
}
