import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesComponent } from './features.component';
import { IsNotSignedInGuard } from '../services/guards/is-not-signed-in.service';
import { IsSignedInGuard } from '../services/guards/is-signed-in.service';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./authentification/authentification.module').then(m => m.AuthentificationModule),
        canActivate: [
          IsNotSignedInGuard
        ]
      },
      {
        path: 'warehouse',
        loadChildren: () => import('./warehouse/warehouse.module').then(m => m.WarehouseModule),
        canActivate: [
          IsSignedInGuard
        ]
      },
      {
        path: '', redirectTo: 'auth', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
