import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../services/errorHandler.service';
import { AuthService } from '../../auth.service';
import { Login } from '../../login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error!: string ;
  submitted = false;
  returnUrl!: string;
  success!: boolean;
  static TimeOutErrorMessage = 'Auth.TimeOutErrorMessage';
  @ViewChild('logInForm') logInForm!: NgForm;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'];
    });
  }
  login() {
    this.submitted = true;
    if (!this.logInForm.valid) return;
    this.success = false;
    this.authService
      .login(this.logInForm.value.email, this.logInForm.value.password)
      .subscribe(
        (res) => {
          debugger;
          let resData = res.data;
          this.error = '';
          let phoneConfirmed = resData.user.phoneNumberConfirmed;
          let twoFactorAuthEnabled = resData.twoFactorAuthEnabled;

          if (!phoneConfirmed) {
            this.router.navigate(['/auth/verify-code'], {
              queryParams: { returnUrl: this.returnUrl },
            });
            return;
          }

          if (phoneConfirmed && twoFactorAuthEnabled) {
            this.router.navigate(['/auth/verify-code'], {
              queryParams: { returnUrl: this.returnUrl },
            });
            return;
          }

          if (phoneConfirmed && !twoFactorAuthEnabled)
            this.loginWithCheckReturnURL(resData);
        },
        (error: any) => {
          // this.errorHandler.handleError(error);
          this.error = error.error.message;
        }
      );
  }
  signUp() {
    if (this.returnUrl)
      this.router.navigate(['/auth/register'], {
        queryParams: { returnUrl: this.returnUrl },
        relativeTo: this.route,
      });
    else
      this.router.navigate(['/auth/register'], {
        relativeTo: this.route,
      });
  }
  private loginWithCheckReturnURL(data: Login) {
    this.authService.user.setTokenData(data.token);
    this.authService.handleAuth(data.user);

    if (this.returnUrl)
      this.router.navigateByUrl(decodeURIComponent(this.returnUrl));
    else this.router.navigate(['/']);
  }
}
