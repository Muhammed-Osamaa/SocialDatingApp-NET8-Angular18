import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  toastrService = inject(ToastrService);
  route = inject(Router);
  model: {
    username: string;
    password: string;
  } = {
    username: '',
    password: '',
  };
  accountService = inject(AccountService);
  cancle = output<void>();
  register() {
    this.accountService.register(this.model).subscribe({
      next: (res) => {
        this.toastrService.success("You've Registerd Successflly " +this.model.username+"!");
        this.cancel();
        this.route.navigateByUrl("/members");
      },error:err=>this.toastrService.error(err.error),
      complete:()=>console.log("the register has just completed")
    });
  }

  cancel() {
    this.cancle.emit();
  }
}
