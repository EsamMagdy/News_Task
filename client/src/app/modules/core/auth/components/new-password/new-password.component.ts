import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../../services/localStorage.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {
  @ViewChild('passResetForm') passResetForm!: NgForm;
  submitted = false;
  error!: string;
  resendCodeButton = true;
  counter = 10;

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {}

  setNewPassword() {
    this.submitted = true;
    if (!this.passResetForm.valid) return;

    let vm = { ...this.passResetForm.value };
    this.error = null;
    this.authService.resetPassword(vm).subscribe(
      () => {
        this.router.navigate(['/auth/login']);
      },
      (error: any) => {
        debugger;
        this.error = error.error.message;
      }
    );
  }

  resendCode() {
    let phoneNumber = this.localStorageService.phoneNumberLocalStorage;

    let authServiceObs: Observable<any>;
    authServiceObs = this.authService.resendCode(phoneNumber);

    authServiceObs.subscribe((resData) => {
      //   if (!resData.state && resData.message) {
      //     this.error = resData.message[0].value;
      //     return;
      //   }
      this.resendCodeButton = false;
      this.counter = 10;
      setInterval(() => {
        this.counter--;
        if (this.counter == 0) {
          this.resendCodeButton = true;
          return;
        }
      }, 1000);
      //   setTimeout(() => {
      //     this.resendCodeButton = false;
      //   }, 10000);
    });
  }
}
