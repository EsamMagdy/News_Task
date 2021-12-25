import { VerifySignInCode } from './verifySignInCode.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorage } from '../../shared/models/localStorage.model';
import { LocalStorageKeys } from '../../shared/models/localStorageKeys.model';
import { User } from '../../shared/models/user.model';
import { LocalStorageService } from '../services/localStorage.service';
import { Login } from './login.model';
import { Register } from './register.model';
import { VerifyCode } from './verifyCode.model';
import { VerifyRegisterCode } from './verifyRegisterCode.model';
import { ResponseModel } from '../../shared/models/responseModel.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  switchToLogin = new Subject<boolean>();
  isRegister = new Subject<boolean>();
  isVerfied = new Subject<boolean>();

  user: User = new User();
  userSb = new BehaviorSubject<User>(null);

  private tokenExpirationTimer: any;
  login(userName: string, password: string, rememberMe: boolean = false) {
    // LocalStorage.removeAllLocalStorage();
    return this.http
      .post<ResponseModel<Login>>(environment.apiUrl + 'Account/login', {
        userName: userName,
        password: password,
        rememberMe: rememberMe,
      })
      .pipe(
        tap((res) => {
          let resData = res.data;
          this.user.phoneNumber = userName;
          this.user.password = password;
          this.user.rememberMe = rememberMe;
          this.user.id = resData.user.id;
          this.user.crmUserId = resData.user.crmUserId;
          this.user.phoneNumberConfirmed = resData.user.phoneNumberConfirmed;
          resData.user.password = password;
          this.localStorageService.loginDataLocalStorage = resData;
          localStorage.removeItem(LocalStorageKeys.registerData);

          // }
        })
      );
  }
  register(registerData: Register) {
    return this.http
      .post<ResponseModel<VerifyRegisterCode>>(
        environment.apiUrl + 'Account/Register',
        registerData
      )
      .pipe(
        // catchError(this.handleErrorService.handleError),
        tap((res) => {
          let resData = res.data;
          this.user.phoneNumber = resData.phoneNumber;
          this.user.password = resData.password;
          this.user.id = resData.userId;
          this.user.rememberMe = resData.rememberMe;
          this.user.phoneNumberConfirmed = false;

          this.localStorageService.registrationDataLocalStorage = this.user;
          localStorage.removeItem(LocalStorageKeys.loginData);
        })
      );
  }
  verifyCode(code: string) {
    let user =
      this.localStorageService.registrationDataLocalStorage ??
      this.localStorageService.loginDataLocalStorage.user;
    user.code = code;
    return this.http
      .post<ResponseModel<VerifyCode>>(
        environment.apiUrl + 'Account/VerifyCode',
        {
          PhoneNumber: user.phoneNumber,
          Password: user.password,
          Code: code,
          UserId: user.id,
        }
      )
      .pipe(
        // catchError(this.handleErrorService.handleError),
        tap((res) => {
          let resData = res.data;
          this.user.phoneNumberConfirmed = resData.user.phoneNumberConfirmed;
          this.user.setTokenData(resData.token);
          this.handleAuth(resData.user);
        })
      );
  }
  verifySignInCode(code: string) {
    let user =
      this.localStorageService.registrationDataLocalStorage ??
      this.localStorageService.loginDataLocalStorage.user;
    user.code = code;
    return this.http
      .post<ResponseModel<VerifySignInCode>>(
        environment.apiUrl + 'Account/VerifySignInCode',
        {
          PhoneNumber: user.phoneNumber,
          Password: user.password,
          Code: code,
        }
      )
      .pipe(
        // catchError(this.handleErrorService.handleError),
        tap((res) => {
          let resData = res.data;
          this.user.setTokenData(resData.token);
          this.handleAuth(resData.user);
        })
      );
  }
  resendSignInCode(phoneNumber: string) {
    return this.http.post<ResponseModel<any>>(
      environment.apiUrl + 'Account/ReGenrateSignInCode',
      {
        phoneNumber: phoneNumber,
      }
    );
  }
  resendCode(phoneNumber: string) {
    return this.http.post<ResponseModel<any>>(
      environment.apiUrl + 'Account/ReGenrateCode',
      {
        phoneNumber: phoneNumber,
      }
    );
  }
  forgotPassword(phoneNumber: string) {
    this.localStorageService.phoneNumberLocalStorage = phoneNumber;
    return this.http.post(environment.apiUrl + 'Account/ForgotPassword', {
      phoneNumber: phoneNumber,
    });
  }
  resetPassword(vm: any) {
    return this.http.post<ResponseModel<any>>(
      environment.apiUrl + 'Account/ResetPassword',
      {
        phoneNumber: this.localStorageService.phoneNumberLocalStorage,
        password: vm.password,
        confirmPassword: vm.confirmPassword,
        code: vm.code,
      }
    );
  }
  autoLogin() {
    let userData = this.localStorageService.userLocalStorage;

    if (!userData) return;

    const loaderUser = new User(
      userData.userId,
      userData.crmUserId,
      userData.name,
      userData.userName,
      userData.phoneNumber,
      '',
      userData.email,
      '',
      '',
      userData.address,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loaderUser.token) {
      loaderUser.phoneNumberConfirmed = true;
      this.userSb.next(loaderUser);

      if (userData.rememberMe) {
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();

        this.autoLogout(expirationDuration);
      } else this.autoLogout(0);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, 2147483647); //expirationDuration
  }
  logout() {
    this.userSb.next(null);
    this.router.navigate(['/auth']);
    LocalStorage.removeAllLocalStorage();

    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }
  handleAuth(user: User) {
    this.user.email = user.email;
    this.user.name = user.name;
    this.user.userName = user.userName;
    this.user.id = user.id ?? this.user.id;
    this.user.crmUserId = user.crmUserId;
    this.user.phoneNumber = user.phoneNumber;
    this.user.password = user.password ?? this.user.password;
    this.user.phoneNumberConfirmed =
      user.phoneNumberConfirmed ?? this.user.phoneNumberConfirmed;
    this.userSb.next(this.user);
    if (this.user.expiresIn) this.autoLogout(this.user.expiresIn);
    localStorage.setItem('userData', JSON.stringify(this.user));
  }
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
