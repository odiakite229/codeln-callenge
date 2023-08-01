import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthentificationRoutingModule } from './authentification-routing.module';
import { AuthentificationComponent } from './authentification.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { SignupScreenComponent } from './screens/signup-screen/signup-screen.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';


@NgModule({
  declarations: [
    AuthentificationComponent,
    LoginScreenComponent,
    SignupScreenComponent
  ],
  imports: [
    AuthentificationRoutingModule,
    NgbCarouselModule,
    SharedModule,
  ]
})
export class AuthentificationModule { }
