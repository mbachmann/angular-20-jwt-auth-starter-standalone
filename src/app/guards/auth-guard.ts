import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(
    next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let redirectTo = '';
    const allowedRoles = next.data['roles'] as string[];
    if (next.routeConfig && next.routeConfig.path) {
      redirectTo = next.routeConfig.path;
    }

    if (this.authService.hasAnyRole(allowedRoles)) {
      return true;
    } else {
      console.log('no access rights, need role ' + allowedRoles);
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/', '401'], { queryParams: { redirect: redirectTo } });
      } else {
        this.router.navigate(['/', 'login'], { queryParams: { redirect: redirectTo } });
      }

      // Redirect or handle unauthorized access
      return false;
    }
  }
}

export const authGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state) as boolean;
};
