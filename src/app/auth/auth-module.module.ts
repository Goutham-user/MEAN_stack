import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "../angular-material.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

@NgModule({
    declarations: [
        LoginComponent,
        SignUpComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        AngularMaterialModule,
        AuthRoutingModule
    ]
})

export class AuthModule { }