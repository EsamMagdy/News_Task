import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGurad implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.authService.autoLogin();
    return this.authService.userSb.pipe(
      map((user) => {
        const isAuth = !!user;

        // if (!isAuth) return this.router.createUrlTree(['/auth']);
        if (!isAuth) {
          // return this.router.createUrlTree(['/auth']);
          this.router.navigate(['/auth'], {
            queryParams: { returnUrl: state.url },
          });
          return false;
        }
        
        const phoneNumberConfirmed = user.phoneNumberConfirmed;
        if (isAuth && phoneNumberConfirmed) {
          return true;
        }

        if (isAuth && !phoneNumberConfirmed)
          return this.router.createUrlTree(['/auth/verify-code']);

        return this.router.createUrlTree(['/auth']);
      })
      //   tap((isAuth) => {
      //     if (isAuth) this.router.navigate(['/auth']);
      //   })
    );
  }
}
