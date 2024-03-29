import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService : AuthService, private router : Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  | Observable<boolean> | Promise<boolean> {
       let isAuth: boolean;
        this.authService.getAuthStatus().subscribe((isAuthenticated)=>{
            isAuth = isAuthenticated
       });
       console.log('isAuth', isAuth)
       if(!isAuth){
           this.router.navigate(['/auth/login'])
       }

        return isAuth;
    }

}