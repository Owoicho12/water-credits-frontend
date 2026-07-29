import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { selectCurrentUserRole } from '../store/auth/auth.selectors';
import { UserRole } from '../models/user.model';
import { AppState } from '../store/app.state';
import { setRouteError } from '../store/ui/ui.actions';

export const RoleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
): Observable<boolean | UrlTree> => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  const allowedRoles: UserRole[] = route.data?.['roles'] ?? [];

  return store.select(selectCurrentUserRole).pipe(
    take(1),
    map((role): boolean | UrlTree => {
      if (role && allowedRoles.includes(role)) {
        return true;
      }
      
      // Dispatch 403 error instead of silently redirecting to dashboard
      store.dispatch(setRouteError({ error: '403' }));
      return false; // Cancel navigation so resolvers don't run
    }),
  );
};
