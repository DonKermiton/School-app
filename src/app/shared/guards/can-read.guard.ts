import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take, tap} from "rxjs/operators";
import {AuthService} from "../../auth/services/auth.service";


@Injectable({
  providedIn: 'root'
})
export class CanReadGuard implements CanActivate {

  constructor(private auth: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$.pipe(
      take(1),
      map(user => user && this.auth.canRead(user) ? true : false),
      tap(CanView => {
        if (!CanView) {
          console.log('Denied - CanRead only')
        }
      })
    )
  }

}
