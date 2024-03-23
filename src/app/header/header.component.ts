import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../services/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
    isUserAuthenticated: boolean = false;
    private authListnerSubs: Subscription;

    constructor(private authService: AuthService){}

    ngOnInit(){
        this.isUserAuthenticated = this.authService.getIsAuth();
        this. authListnerSubs = this.authService.getAuthStatus().subscribe((isAuthenticated)=>{
            this.isUserAuthenticated = isAuthenticated
        })
    }

    logout(){
        this.authService.onLogout()
    }

    ngOnDestroy(){
        this.authListnerSubs.unsubscribe();
    }
    
}