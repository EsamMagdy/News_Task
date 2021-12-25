import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('sendCodeForm') vForm: NgForm;
  error = '';
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {}
  sendCode() {
    debugger;
    if (!this.vForm.valid) return;

    this.authService.forgotPassword(this.vForm.value.userName).subscribe(
      () => {
        this.router.navigate(['/auth/new-password']);
      },
      (error: any) => {
        this.error = error.error.message;
      }
    );
  }
}
