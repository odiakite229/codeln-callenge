import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { PaginationControlsComponent } from './components/pagination-controls/pagination-controls.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ListHeaderComponent } from './components/list-header/list-header.component';

const components = [
  ProductListComponent,
  PaginationControlsComponent,
  ListHeaderComponent
];

const modules = [
  CommonModule,
  ReactiveFormsModule,
  RouterModule,
  FontAwesomeModule,
  FlexLayoutModule,
  AngularFireDatabaseModule,
  AngularFireAuthModule,
  NgbModule
]

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    ...modules
  ],
  exports: [
    ...components,
    ...modules
  ]
})
export class SharedModule { }
