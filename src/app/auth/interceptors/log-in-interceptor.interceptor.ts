import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AngularFireAuth} from "@angular/fire/auth";
import {mergeMap} from "rxjs/operators";

@Injectable()
export class LogInInterceptorInterceptor implements HttpInterceptor {

  constructor(private auth: AngularFireAuth) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('dziala')
    return next.handle(request);
  }
}
