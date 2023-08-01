import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { SignupScreenComponent } from './screens/signup-screen/signup-screen.component';

const routes: Routes = [
  {
    path: '',
    component: AuthentificationComponent,
    children: [
      { path: 'login', component: LoginScreenComponent },
      { path: 'signup', component: SignupScreenComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthentificationRoutingModule { }
