import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  private token = 'sarath201545'; 
  apiUrl='https://jsonplaceholder.typicode.com/users'

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add token to the header
    if (this.token) {
      url:this.apiUrl+request?.url
      request = request.clone({
        
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    }
  
    // Display a progress bar
    this.showProgressBar();
  
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            // Handle successful responses
            console.log('Response:', event);
          }
        },
        (error) => {
          // Handle HTTP errors
          console.error('HTTP Error:', error);
        }
      ),
      catchError((error: HttpErrorResponse) => {
        // Handle response failed status
        console.error('Response failed status:', error);
        return throwError(error);
      }),
      finalize(() => {
        // Hide the progress bar
        this.hideProgressBar();
      })
    );
  }

  private showProgressBar() {
    console.log('Progress Bar: Show');
  }

  private hideProgressBar() {
    console.log('Progress Bar: Hide');
  }
}
