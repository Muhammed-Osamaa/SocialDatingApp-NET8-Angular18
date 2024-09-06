import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  get400Error() {
   const url = this.baseUrl;
    this.http.get(url+"ErrorList/bad-request").subscribe({
      next:r => console.log(r),
      error:err =>console.log(err)      
    })
  }

  get401Error() {
    this.http.get("https://localhost:5001/api/ErrorList/auth").subscribe({
      next:r => console.log(r),
      error:err =>console.log(err)      
    })
  }

  get404Error() {
    this.http.get("https://localhost:5001/api/ErrorList/not-found").subscribe({
      next:r => console.log(r),
      error:err =>console.log(err)      
    })
  }

  get500Error() {
    this.http.get("https://localhost:5001/api/ErrorList/server-error").subscribe({
      next:r => console.log(r),
      error:err =>console.log(err)      
    })
  }

  
  get400EValidationError() {
    this.http.post("https://localhost:5001/api/account/register",{}).subscribe({
      next:r => console.log(r),
      error:err =>console.log(err)      
    })
  }
}
