import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component'
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './services/auth.interceptor';
import { ErrorInterceptorInterceptor } from './services/error-interceptor.interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { PostModule } from './posts/post-module.module';

@NgModule({

  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    AngularMaterialModule,
    PostModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]

})
export class AppModule { }
