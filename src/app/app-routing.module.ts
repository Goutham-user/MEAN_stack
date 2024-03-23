import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { PostList } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AuthGuard } from './services/auth-guard/auth-guard';

const route : Routes = [
  { path: '', component: PostList, pathMatch: 'full'},
  { path: 'create', component : PostCreateComponent, canActivate : [AuthGuard] },
  { path: 'edit/:postId', component : PostCreateComponent, canActivate: [AuthGuard] },
  {path: "auth", loadChildren : ()=> import('./auth/auth-module.module').then(m => m.AuthModule) }

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
