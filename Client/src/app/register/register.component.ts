import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
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
        console.log(res);
        this.cancel();
      },error:err=>console.log(err.error),
      complete:()=>console.log("the register has just completed")
    });
  }

  cancel() {
    this.cancle.emit();
  }
}
