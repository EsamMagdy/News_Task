import { News } from './news.model';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/modules/core/auth/auth.service';
import {
  Diffraction,
  Diffractions,
} from 'src/app/modules/core/data/diffraction';
import { ServicesList } from 'src/app/modules/core/data/services';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { LocalStorageService } from 'src/app/modules/core/services/localStorage.service';
import { AlertErrorService } from 'src/app/modules/shared/components/alert-error/alert-error.service';
import { LocalStorageKeys } from 'src/app/modules/shared/models/localStorageKeys.model';
import { User } from 'src/app/modules/shared/models/user.model';
import { ServiceType } from 'src/app/modules/shared/_enums/serviceType';
import { NewsService } from './news.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  slidesStore = 'assets/images/home/img1.png';
  services = [...ServicesList];
  diffraction: Diffraction[] = [...Diffractions];
  @ViewChild('contactUsForm') contactUsForm!: NgForm;
  user!: User;
  @ViewChild('dt') table: Table;
  news: News[];
  selectedUsers: User[];
  productDialog: boolean;
  submitted: boolean;
  pageNumber = 1;
  pageSize = 5;
  totalCount = 0;
  loading = false;

  selectedItems: any = [];
  dropdownSettings = {};

  constructor(
    public translate: TranslateService,
    public langService: LangService,
    private localStorageService: LocalStorageService,
    private alertErrorService: AlertErrorService,
    private authService: AuthService,
    private newsService: NewsService,
    private router: Router,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.authService.userSb.subscribe((user) => {
      if (user) {
        debugger;
        this.user = user;
      }
    });
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  editUser(user: User) {
    this.productDialog = true;
  }
  deleteUser(user: any) {}
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
  saveUser() {
    this.submitted = true;
    if (this.user && !this.user.id) {
      // this.companyService.createUser(this.user).subscribe((response) => {
      //   this.productDialog = false;
      //   this.user = {} as User;
      //   this.users.push(response);
      //   this.messageService.add({
      //     severity: 'success',
      //     summary: 'Successful',
      //     detail: 'Product Created',
      //     life: 3000,
      //   });
      // });
      return;
    }
    // this.companyService.updateUser(this.user).subscribe((response) => {
    //   this.messageService.add({
    //     severity: 'success',
    //     summary: 'Successful',
    //     detail: 'Product Updated',
    //     life: 3000,
    //   });
    // });
    // this.users[this.findIndexById(this.user.id)] = this.user;
    // this.users = [...this.users];
    this.productDialog = false;
    this.user = {} as User;
    // if (this.product.name.trim()) {
    //     if (this.product.id) {
    //         this.products[this.findIndexById(this.product.id)] = this.product;
    //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
    //     }
    //     else {
    //         this.product.id = this.createId();
    //         this.product.image = 'product-placeholder.svg';
    //         this.products.push(this.product);
    //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
    //     }

    //     this.products = [...this.products];
    //     this.productDialog = false;
    //     this.product = {};
    // }
  }
  findIndexById(id: string): number {
    let index = -1;
    // for (let i = 0; i < this.users.length; i++) {
    //   if (this.users[i].id === id) {
    //     index = i;
    //     break;
    //   }
    // }

    return index;
  }
  deleteSelectedUsers() {
    // this.confirmationService.confirm({
    //   message: 'Are you sure you want to delete the selected products?',
    //   header: 'Confirm',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     this.users = this.users.filter(
    //       (val) => !this.selectedUsers.includes(val)
    //     );
    //     this.user = null;
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Successful',
    //       detail: 'Products Deleted',
    //       life: 3000,
    //     });
    //   },
    // });
  }
  openNew() {
    this.router.navigate(['news/add-news']);
    // this.user = {} as User;
    // this.submitted = false;
    // this.productDialog = true;
  }
  filterGlobal($event: any, val: string) {
    this.table.filterGlobal(
      (<HTMLInputElement>$event.target).value,
      'contains'
    );
  }
  onPage(event: any) {
    let pageIndex = event.first / event.rows + 1;
  }
  loadCarsLazy(event: any) {}
  loadUsers(event: {
    filters: any;
    first: number;
    globalFilter: any;
    multiSortMeta: { field: string; order: number }[];
    rows: number;
    sortField: string;
  }) {
    console.log(event);
    this.loading = true;
    this.pageNumber = event.first / event.rows + 1;
    this.newsService
      .getNews(
        this.pageNumber,
        this.pageSize,
        event.multiSortMeta != null ? event.multiSortMeta[0].order : 1,
        event.multiSortMeta != null ? event.multiSortMeta[0].field : '',
        event.globalFilter != null ? event.globalFilter : ''
      )
      .subscribe((response) => {
        this.loading = false;
        this.news = response.data.items;
        this.totalCount = response.data.totalItems;
        console.log(response);
      });
  }
  getBackground(image:any) {
    return this._sanitizer.bypassSecurityTrustStyle(
      `linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`
    );
  }
}
