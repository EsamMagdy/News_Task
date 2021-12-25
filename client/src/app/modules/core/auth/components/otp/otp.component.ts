import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { LocalStorageService } from '../../../services/localStorage.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  @ViewChild('verificationForm') vForm!: NgForm;
  isLastNumber: boolean = true;
  success = false;
  resendCodeSuccess = false;
  error: string = null;
  user: any;
  submitted = false;
  resendCodeButton = true;
  counter = 10;
  returnUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user =
      this.localStorageService.registrationDataLocalStorage ??
      this.localStorageService.loginDataLocalStorage?.user;

    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'];
    });
     //this.setTimer();
  }

  setTimer() {
    // setInterval(() => {
    //   if (this.timeLeft > 0) {
    //     this.timeLeft--;
    //   } else {
    //     this.resendCodeButton = true;
    //   }
    // }, 1000);
  }
  // onSubmit() {
  //   if (this.resendCodeButton == false) {
  //     this.submit();
  //   } else {
  //     this.resendCode();
  //   }
  // }
  submit() {
    debugger;
    this.submitted = true;
    if (!this.vForm.valid) return;

    this.success = false;
    let code = this.vForm.value.Code;

    let phoneConfirmed = this.user.phoneNumberConfirmed;
    let twoFactorAuthEnabled =
      this.localStorageService.loginDataLocalStorage?.twoFactorAuthEnabled;

    let verifyCodeObs: Observable<any>;

    if (this.user && !phoneConfirmed)
      verifyCodeObs = this.authService.verifyCode(code);

    if (this.user && phoneConfirmed && twoFactorAuthEnabled)
      verifyCodeObs = this.authService.verifySignInCode(code);

    verifyCodeObs.subscribe(
      (resData) => {
        this.vForm.reset();
        this.submitted = false;
        // this.router.navigate(['/']);
        this.loginWithCheckReturnURL();
      },
      (error: any) => {
        this.error = error.error.message;
      }
    );
  }

  resendCode() {
    debugger;
    let authServiceObs: Observable<any>;
    this.resendCodeSuccess = false;
    this.error = null;
    this.vForm.reset();
    if (this.user.phoneNumberConfirmed)
      authServiceObs = this.authService.resendSignInCode(this.user.phoneNumber);
    else authServiceObs = this.authService.resendCode(this.user.phoneNumber);

    authServiceObs.subscribe((resData) => {
      if (!resData.state && resData.message) {
        this.error = resData.message[0].value;
        return;
      }

      this.resendCodeButton = false;
      this.counter = 10;
      setInterval(() => {
        this.counter--;
        if (this.counter == 0) {
          this.resendCodeButton = true;
          return;
        }
      }, 1000);
    });
  }

  private loginWithCheckReturnURL() {
    if (this.returnUrl)
      this.router.navigateByUrl(decodeURIComponent(this.returnUrl));
    else this.router.navigate(['/']);
  }
}
