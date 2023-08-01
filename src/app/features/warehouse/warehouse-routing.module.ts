import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehouseComponent } from './warehouse.component';
import { WarehouseListScreenComponent } from './screens/warehouse-list-screen/warehouse-list-screen.component';
import { WarehouseFormScreenComponent } from './screens/warehouse-form-screen/warehouse-form-screen.component';
import { UpdateWarehouseResolver } from './route-resolver/update-warehouse.resolver';

const routes: Routes = [
  {
    path: '',
    component: WarehouseComponent,
    children: [
      {
        path: '',
        component: WarehouseListScreenComponent
      },
      {
        path: 'create',
        component: WarehouseFormScreenComponent
      },
      {
        path: 'update/:id',
        component: WarehouseFormScreenComponent,
        resolve: { warehouse: UpdateWarehouseResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
