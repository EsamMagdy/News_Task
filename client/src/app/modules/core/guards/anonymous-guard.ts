import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  CanActivateChild,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AnonymousGuard implements CanActivate {
  isLoggedIn: boolean = true; // retrieved from a authService
  // change this to 'false' to simulate anonymous user (and also to auth-guard)

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.userSb.pipe(
      map((user) => {
        const isAuth = !!user;

        if (!isAuth) {
          return true;
        }
        return false;
      })
    );
  }
}
