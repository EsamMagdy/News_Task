import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ServiceType } from 'src/app/modules/shared/_enums/serviceType';
import { LangService } from '../../services/lang.service';
import { User } from 'src/app/modules/shared/models/user.model';
import { AuthService } from '../../auth/auth.service';
import { LanguageService } from '../../services/language.service';
import { LocalStorageService } from '../../services/localStorage.service';
import { LocalStorageKeys } from 'src/app/modules/shared/models/localStorageKeys.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLangAr!: boolean;
  currentLang!: string;
  htmlTag!: any;
  isScrolled!: boolean;
  user!: User;
  secondaryTheme = false;
  isAuthenticated: boolean = false;
  stepId!: string;
  private userSub!: Subscription;
  constructor(
    public translate: TranslateService,
    public langService: LangService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private authServices: AuthService,
    private localStorageService: LocalStorageService,
    private ar: ActivatedRoute
  ) {
    this.htmlTag = this.document.getElementsByTagName(
      'html'
    )[0] as HTMLHtmlElement;
  }

  ngOnInit() {
    this.ar.params.subscribe((params: Params) => {
      this.stepId = params['id'];
    });

    this.checkLang();
    this.langService.getIsLangArHandler().subscribe((state: boolean) => {
      this.isLangAr = state;
    });

    // change navbar theme based on DNS
    //  change navbar theme based on DNS
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd && event.url) {
        if (!event.url.includes('home') && event.url != '/') {
          this.secondaryTheme = true;
        } else {
          this.secondaryTheme = false;
        }
      }
    });
    this.authServices.userSb.subscribe(
      (user) => (this.isAuthenticated = !!user)
    );
    this.authServices.userSb.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.user = user;
      }
    });
  }

  checkLang() {
    this.currentLang = this.langService.getCurrentLang();

    if (this.currentLang == 'ar') {
      this.isLangAr = true;
      this.htmlTag.dir = 'rtl';
      this.htmlTag.lang = 'ar';
    } else {
      this.isLangAr = false;
      this.htmlTag.dir = 'ltr';
      this.htmlTag.lang = 'en';
    }
    this.translate.use(this.currentLang);
  }

  onLangChange() {
    if (this.isLangAr) {
      this.langService.changeCurrentLang('en');
      this.translate.use('en');
      this.htmlTag.dir = 'ltr';
      this.htmlTag.lang = 'en';
    } else {
      this.langService.changeCurrentLang('ar');
      this.translate.use('ar');
      this.htmlTag.dir = 'rtl';
      this.htmlTag.lang = 'ar';
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    number > 88 ? (this.isScrolled = true) : (this.isScrolled = false);
  }
  onLogout() {
    this.authServices.logout();
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
