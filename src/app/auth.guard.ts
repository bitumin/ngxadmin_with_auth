import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user.pipe(
      take(1),
      map(user => !!user && !user.isAnonymous && user.emailVerified),
      tap(loggedIn => {
        console.info('canActivate guard: triggered');
        if (!loggedIn) {
          console.warn('canActivate guard: not logged in, redirecting to login');
          // noinspection JSIgnoredPromiseFromCall
          this.router.navigate(['/auth/login']);
        }
      }),
    );
  }
}
