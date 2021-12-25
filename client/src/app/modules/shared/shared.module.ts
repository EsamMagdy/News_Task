import { SafeUrlPipe } from './pipes/safeUrl.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CoreModule } from "../core/core.module";
import { LoaderInterceptor } from "../core/interceptors/loaderInterceptor.service";
import { AlertErrorComponent } from "./components/alert-error/alert-error.component";
import { MyLoaderComponent } from "./components/my-loader/my-loader.component";

@NgModule({
  declarations: [
    // CheckIDNumberDirective,
    MyLoaderComponent,
    AlertErrorComponent,
    SafeUrlPipe
  ],
  imports: [
    CommonModule,
    CoreModule,
    NgxSpinnerModule,
  ],
  exports: [
    CoreModule,
    MyLoaderComponent,
    // CheckIDNumberDirective,
    AlertErrorComponent,
    SafeUrlPipe
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
})
export class SharedModule {}
