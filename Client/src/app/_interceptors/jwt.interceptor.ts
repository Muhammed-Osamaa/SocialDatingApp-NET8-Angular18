import { HttpInterceptorFn } from '@angular/common/http';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountServce = inject(AccountService);
  if(accountServce.currentUser()){
    req = req.clone({
      setHeaders: {
         Authorization: `Bearer ${accountServce.currentUser()?.token}`
      }
    })
  }
  return next(req);
};
