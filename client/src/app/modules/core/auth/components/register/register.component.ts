import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../services/errorHandler.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationMessage: string;
  isRegister = true;
  success = false;
  error: string = null;
  password!: string;
  cPassword!: string;
  returnUrl: string;

  @ViewChild('registerForm') registerForm: NgForm;
  @ViewChild('errorSummary') errorSummary: ElementRef;

  constructor(
    private authService: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'];
    });
  }

  value3: string;

  register() {
    if (!this.registerForm.valid) return;

    this.error = null;

    this.authService.register(this.registerForm.value).subscribe(
      () => {
        this.router.navigate(['/auth/verify-code'], {
          queryParams: { returnUrl: this.returnUrl },
        });
        this.registerForm.reset();
      },
      (error: any) => {
        this.errorHandler.handleError(error);
      }
    );
  }
}
