import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatus().subscribe(
      authStattus => {
        console.log(authStattus)
        this.isLoading = false
      })
  }

  onSignUp(signUpFormData: NgForm) {
    if (signUpFormData.invalid) {
      return
    };

    this.isLoading = true;
    this.authService.createUser(signUpFormData.value.email, signUpFormData.value.password);
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

}
