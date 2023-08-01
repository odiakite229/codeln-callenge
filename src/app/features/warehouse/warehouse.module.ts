import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseComponent } from './warehouse.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { WarehouseListScreenComponent } from './screens/warehouse-list-screen/warehouse-list-screen.component';
import { WarehouseFormScreenComponent } from './screens/warehouse-form-screen/warehouse-form-screen.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    WarehouseComponent,
    WarehouseListScreenComponent,
    WarehouseFormScreenComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    ThemeModule,
    SharedModule
  ]
})
export class WarehouseModule { }
