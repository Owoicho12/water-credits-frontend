import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppState } from '../store/app.state';
import { setRouteError } from '../store/ui/ui.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

/**
 * A higher-order functional resolver that wraps another resolver
 * and catches HTTP errors, dispatching a route error action before re-throwing.
 * 
 * Usage:
 * resolve: {
 *   data: resolveWithErrorHandling(myOriginalResolverFn)
 * }
 */
export function resolveWithErrorHandling<T>(resolver: ResolveFn<T>): ResolveFn<T> {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const store = inject(Store<AppState>);
    
    // Execute the original resolver
    const result = resolver(route, state);
    
    // If it's an observable, catch errors
    if (result instanceof Observable) {
      return result.pipe(
        catchError((error) => {
          let errorType: '404' | '500' | '403' | 'offline' = '500';
          
          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              errorType = '404';
            } else if (error.status === 403) {
              errorType = '403';
            } else if (error.status === 0 || !navigator.onLine) {
              errorType = 'offline';
            }
          }
          
          store.dispatch(setRouteError({ error: errorType }));
          
          // Re-throw so the router knows navigation failed
          return throwError(() => error);
        })
      );
    }
    
    // If it's a promise, catch errors
    if (result instanceof Promise) {
      return result.catch(error => {
        store.dispatch(setRouteError({ error: '500' }));
        throw error;
      });
    }
    
    return result;
  };
}
