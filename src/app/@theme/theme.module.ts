import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwoColumnLayoutComponent } from './layouts/two-column-layout/two-column-layout.component';
import { OneColumnLayoutComponent } from './layouts/one-column-layout/one-column-layout.component';
import { LayoutHeaderComponent } from './components/layout-header/layout-header.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutSidebarComponent } from './components/layout-sidebar/layout-sidebar.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

const components = [
  TwoColumnLayoutComponent,
  OneColumnLayoutComponent,
  LayoutHeaderComponent,
  MainLayoutComponent,
  HeaderComponent,
  LayoutSidebarComponent,
  BreadcrumbComponent
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ...components
  ]
})
export class ThemeModule { }
