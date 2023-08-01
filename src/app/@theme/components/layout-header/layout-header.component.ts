import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {

  displayUserName: string = '';

  constructor(
    private authService: AuthService,
    private info: InfoService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getCurrentUserDisplayName()
  }


  /**
   * Update user display name
   */
  getCurrentUserDisplayName() {
    this.authService.getCurrentUser().then(user => {
      if (user) {
        this.displayUserName = user.email!
        this.authService.getUserInfo(user.uid).then((profil) => {
          if(profil) {
            this.displayUserName = `${profil.firstname} ${profil.lastname}`;
          }
        });
      }
    });
  }

  /**
   * signout current user
   */
  signOut() {
    this.authService.signOut().then(() => {
      this.router.navigate(['auth', 'login']);
    }).catch(e => this.info.error('Une erreur inconnue est survenue'))
  }

  /**
   * Transform country code in flag emoji
   * @param countryCode string
   * @returns string
   */
  getFlagEmoji(countryCode: string): string {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }
}
