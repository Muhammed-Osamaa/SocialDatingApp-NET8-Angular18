import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class BusyServiceService {
  private busyService = inject(NgxSpinnerService);
  nubmerOfRequest = 0;

  busy() {
    this.nubmerOfRequest++;
    this.busyService.show(undefined, {
      bdColor: 'rgba(0, 0, 0, 0.8)',
      size: 'large',
      color: '#f80000',
      type: 'triangle-skew-spin',
    });    
  }

  idle(){
    this.nubmerOfRequest--;
    if(this.nubmerOfRequest <= 0) {
      this.nubmerOfRequest = 0;
      this.busyService.hide();
    }
  }
}
