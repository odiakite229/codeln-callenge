import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../firebase/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsNotSignedInGuard {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise((resolve, reject) => {
      this.authService.getCurrentUser().then(user => {
        if (user) {
          this.router.navigate(['warehouse']);
        } else {
          resolve(true);
        }
      })
    });
  }

}
