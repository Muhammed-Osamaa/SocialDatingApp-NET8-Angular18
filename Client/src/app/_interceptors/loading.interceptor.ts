import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyServiceService } from '../_services/busy-service.service';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
 const busyService = inject(BusyServiceService);

 busyService.busy();

  return next(req).pipe(
    delay(1000),
    finalize(() => busyService.idle())
  );  
};
