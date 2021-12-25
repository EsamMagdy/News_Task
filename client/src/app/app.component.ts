import { LocalStorageService } from './modules/core/services/localStorage.service';
import { Component, Inject, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './modules/core/auth/auth.service';
import { LocalStorageKeys } from './modules/shared/models/localStorageKeys.model';
import { ServiceType } from './modules/shared/_enums/serviceType';
import { DOCUMENT } from '@angular/common';
import { Languages } from './modules/shared/models/languages.model';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from './modules/core/services/lang.service';

import { Router, NavigationEnd } from '@angular/router';
declare let fbq: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'eitinaa';
  htmlTag!: any;
  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    @Inject(DOCUMENT) private document: Document,
    public langService: LangService,
    public translate: TranslateService
  ) {}
  ngOnInit() {
    this.authService.autoLogin();
    this.primengConfig.ripple = true;
    this.htmlTag = this.document.getElementsByTagName(
      'html'
    )[0] as HTMLHtmlElement;

    let lang = this.localStorageService.languageLocalStorage;
    if (lang == Languages.Arabic) {
      this.langService.changeCurrentLang(Languages.Arabic);
      this.translate.use(Languages.Arabic);
      this.htmlTag.dir = 'rtl';
      this.htmlTag.lang = Languages.Arabic;
    } else if (lang == Languages.English) {
      this.langService.changeCurrentLang(Languages.English);
      this.translate.use(Languages.English);
      this.htmlTag.dir = 'ltr';
      this.htmlTag.lang = Languages.English;
    } else {
      this.langService.changeCurrentLang(Languages.Arabic);
      this.translate.use(Languages.Arabic);
      this.htmlTag.dir = 'rtl';
      this.htmlTag.lang = Languages.Arabic;
    }
  }
}
