import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { InfoService } from '../info.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { AuthService } from '../firebase/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsSignedInGuard {

  constructor(
    private authService: AuthService,
    private info: InfoService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.getCurrentUser().then(user => {
        if (user) {
          resolve(true);
        } else {
          this.info.warning('Veuillez vous connecter SVP');
          this.router.navigate(['auth']);
        }
      })
    });
  }
}
