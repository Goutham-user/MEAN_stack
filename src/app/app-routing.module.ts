import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { PostList } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AuthGuard } from './services/auth-guard/auth-guard';

const route : Routes = [
  { path: '', component: PostList, pathMatch: 'full'},
  { path: 'create', component : PostCreateComponent, canActivate : [AuthGuard] },
  { path: 'edit/:postId', component : PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component : LoginComponent },
  { path: 'sign-up', component : SignUpComponent }

]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(route)
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule { }
