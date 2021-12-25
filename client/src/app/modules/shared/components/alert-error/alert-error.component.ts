import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LocalStorageService } from 'src/app/modules/core/services/localStorage.service';
import Swal from 'sweetalert2';
import { Languages } from '../../models/languages.model';
import { AlertErrorService } from './alert-error.service';

@Component({
  selector: 'app-alert-error',
  templateUrl: './alert-error.component.html',
  styleUrls: ['./alert-error.component.less'],
})
export class AlertErrorComponent implements OnInit {
  @Input() message: string;
  @Input() severity: string;
  @Input() summary: string;
  errorMessage: string;
  returnUrl: string;
  constructor(
    private alertErrorService: AlertErrorService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      debugger;
      this.errorMessage = params['errorMsg'];
      this.returnUrl = params['returnUrl'];
    });

    // this.showError();
  }
  showError() {
    this.alertErrorService.alertError.subscribe((alert) => {
      debugger;
      let lang = this.localStorageService.languageLocalStorage;
      let title = '';
      if (lang == Languages.Arabic) title = 'حدث خطأ ما !';
      else title = 'An Error Occured !';
      if (alert) {
        Swal.fire({
          icon: 'error',
          title: title,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
    this.alertErrorService.alertErrorWithMessageFromApi.subscribe((alert) => {
      debugger;
      let lang = this.localStorageService.languageLocalStorage;
      let title = alert;
      if (alert) {
        Swal.fire({
          icon: 'error',
          title: title,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  }
  goBack() {
    if (this.returnUrl)
      this.router.navigateByUrl(decodeURIComponent(this.returnUrl));
  }
}
