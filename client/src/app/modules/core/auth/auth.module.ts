import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { AuthComponent } from "./auth.component";
import { AuthRoutingModule } from "./auth.routing.module";
import { LoginComponent } from "./components/login/login.component";
import { NewPasswordComponent } from "./components/new-password/new-password.component";
import { OtpComponent } from "./components/otp/otp.component";
import { RegisterComponent } from "./components/register/register.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";

@NgModule({
  imports: [CommonModule, SharedModule, AuthRoutingModule],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    OtpComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
  ],
})
export class AuthModule {}
