import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('voteAqui/token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `${token}`),
      });

      return next(cloned);
    }
  }

  return next(req);
};
