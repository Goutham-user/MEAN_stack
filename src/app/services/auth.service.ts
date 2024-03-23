import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthData } from '../auth/auth';
import { environment } from '../../environments/environment';

const BACKENDURL = environment.apiUrl + '/user/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private userId: string;
  // private isAuthenticated: boolean = false;
  private authStatusListner = new BehaviorSubject<boolean>(false);
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  getToken(){
    return this.token;
  }

  getIsAuth(){
    let isAuth;
    this.authStatusListner.subscribe(res=>{
      isAuth = res;
    })
    return isAuth;
  }

  getUserId(){
    return this.userId;
  }

  getAuthStatus(){
    return this.authStatusListner.asObservable();
  }

  createUser(email: string, password: string){
    const userData: AuthData = {
      email: email,
      password: password
    }
    this.http.post(BACKENDURL + "signup", userData).subscribe((res)=>{
      console.log(res)
      this.router.navigate(['/']);
    }, error => {
      this.authStatusListner.next(false);
    })
  }

  validateLogin(email: string,password: string) {
    const userDara: AuthData ={
      email: email,
      password: password
    }
    this.http.post<{token: string, expiresIn: number, userId: string}>(BACKENDURL + "login", userDara).subscribe((res: any)=>{
      // console.log(res)
      const token = res.token;
      this.token = token;
      if(token){
        // this.isAuthenticated = true;
        const expiresInDuration = res.expiresIn;
        this.userId = res.userId;
        this.setAuthTimer(expiresInDuration);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log(expirationDate)
        this.saveAuthData(token, expirationDate, this.userId);
        this.router.navigate(['/']);
        this.authStatusListner.next(true);
      }
    }, error => {
      this.authStatusListner.next(false);
    })
  };

  setAuthTimer(duration: number){
    console.log("login duration", duration);
    this.tokenTimer = setTimeout(()=>{
      this.onLogout()
    }, duration * 1000)
  }

  onLogout(){
    this.token = null;
    this.authStatusListner.next(false);
    this.router.navigate(['/auth/login']);
    this.clearAuthData();
    this.userId = null;
    clearTimeout(this.tokenTimer);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirsationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if(!token || !expirsationDate){
      return;
    }
    return {
      token: token,
      expirationDate : new Date(expirsationDate),
      userId: userId
    };
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    const now = new Date();
    if(!authInformation){
      return;
    }
    const isInFuture = authInformation.expirationDate.getTime() - now.getTime();
    if(isInFuture > 0){
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.setAuthTimer(isInFuture / 1000);
      this.authStatusListner.next(true);
    }
  }
}
