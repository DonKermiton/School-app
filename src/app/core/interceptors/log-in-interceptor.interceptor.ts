import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AngularFireAuth} from "@angular/fire/auth";
import {mergeMap, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LogInInterceptorInterceptor implements HttpInterceptor {

  constructor(private auth: AngularFireAuth) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.auth.idToken.pipe(
      mergeMap((token: any) => {
        console.log(token);
        if (token) {
          request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        }

        return next.handle(request);

      }));
  }
}
