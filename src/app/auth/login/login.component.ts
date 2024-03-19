import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;
  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    this.authStatusSub = this.authservice.getAuthStatus().subscribe(
      authStattus => {
        console.log(authStattus)
        this.isLoading = false
      })
  }

  onLogin(loginFormData: NgForm){
    if(loginFormData.invalid){
      return
    };
    this.isLoading = true;
    return this.authservice.validateLogin(loginFormData.value.email, loginFormData.value.password)
    // console.log(loginFormData.form.controls)
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
