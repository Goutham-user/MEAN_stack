import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
// import { MatDialog } from "@angular/material";
import { ErrorComponent } from '../error/error.component';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  // constructor(public dialogRef: MatDialog) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse)=>{
        console.log(error);
        alert(error.error.message);
        // this.dialogRef.open(ErrorComponent)
        return throwError(error)
      })
    );
  }
}
