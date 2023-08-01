import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb[navigations]',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Input() navigations: string[] = [];
}
