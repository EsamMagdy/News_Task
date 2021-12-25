import { TranslateService } from '@ngx-translate/core';
import {
  HttpErrorResponse,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Platform } from '@angular/cdk/platform';
import { AppRoutingModels } from 'src/app/app-routing.model';
import { ResponseModel } from '../../shared/models/responseModel.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private platform: Platform,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.userSb.pipe(
      take(1),
      exhaustMap((user) => {
        // if (req.url.indexOf(environment.apiUrl) === -1) return next.handle(req);
        let linkToBack = window.location.href.split('#')[1];

        if (!req.url.includes(environment.domain))
          return next.handle(req).pipe(
            tap(
              (event) => (event instanceof HttpResponse ? 'succeeded' : ''),
              (err: HttpErrorResponse) => {
                let errorFromApi = <ResponseModel<string>>err.error;
                if (err.status == 500) {
                  this.router.navigate([
                    '/' + AppRoutingModels.ErrorPage,
                    { errorMsg: errorFromApi.message, returnUrl: linkToBack },
                  ]);
                  return;
                }
                if (errorFromApi && errorFromApi.status == 404) {
                  this.router.navigate([
                    '/' + AppRoutingModels.NotFound,
                    { errorMsg: errorFromApi.message, returnUrl: linkToBack },
                  ]);
                  return;
                }
                if (err.status == 404) {
                  this.router.navigate(['/' + AppRoutingModels.NotFound]);
                  return;
                }
              }
            )
          ); // don't forget return
        let platform = navigator.platform;
        const modifiedReq = req.clone({
          headers: new HttpHeaders({
            Accept: 'application/json, text/plain, /',
            'content-type': 'application/json',
            'cache-control': 'no-cache',
            source: '2',
            platform: platform,
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
            // 'Access-Control-Allow-Headers':
            //   'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization',
          }),
        });

        if (!user)
          return next.handle(modifiedReq).pipe(
            tap(
              (event) => (event instanceof HttpResponse ? 'succeeded' : ''),
              (err: HttpErrorResponse) => {
                let errorFromApi = <ResponseModel<string>>err.error;
                if (err.status == 500) {
                  this.router.navigate([
                    '/' + AppRoutingModels.ErrorPage,
                    { errorMsg: errorFromApi.message, returnUrl: linkToBack },
                  ]);
                }
                if (errorFromApi && errorFromApi.status == 404) {
                  this.router.navigate([
                    '/' + AppRoutingModels.NotFound,
                    { errorMsg: errorFromApi.message, returnUrl: linkToBack },
                  ]);
                  return;
                }
                if (err.status == 404) {
                  this.router.navigate(['/' + AppRoutingModels.NotFound]);
                  return;
                }
              }
            )
          );

        let timex = Math.floor(1000 + Math.random() * 9000);
        const modifiedReqAuth = req.clone({
          headers: new HttpHeaders({
            Accept: 'application/json, text/plain, /',
            'content-type': 'application/json',
            'cache-control': 'no-cache',
            source: '2',
            Authorization: 'bearer ' + user.token,
            TimeX: timex.toString(),
            platform: platform,
          }),
        });

        return next.handle(modifiedReqAuth).pipe(
          tap(
            (event) => (event instanceof HttpResponse ? 'succeeded' : ''),
            (err: HttpErrorResponse) => {
              let errorFromApi = <ResponseModel<string>>err.error;
              if (err.status == 500) {
                this.router.navigate([
                  '/' + AppRoutingModels.ErrorPage,
                  { errorMsg: errorFromApi.message, returnUrl: linkToBack },
                ]);
              }
              if (errorFromApi && errorFromApi.status == 404) {
                this.router.navigate([
                  '/' + AppRoutingModels.NotFound,
                  { errorMsg: errorFromApi.message, returnUrl: linkToBack },
                ]);
                return;
              }
              if (err.status == 404) {
                this.router.navigate(['/' + AppRoutingModels.NotFound]);
                return;
              }
            }
          )
        );
      })
    );
  }
}
