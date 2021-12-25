import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { GMapModule } from 'primeng/gmap';
import { PasswordModule } from 'primeng/password';

@NgModule({
  imports: [PasswordModule, GMapModule, DropdownModule],
  exports: [PasswordModule, GMapModule, DropdownModule],
})
export class UiMaterials {}
