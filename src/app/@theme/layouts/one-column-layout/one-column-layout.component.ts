import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-one-column-layout',
  templateUrl: './one-column-layout.component.html',
  styleUrls: ['./one-column-layout.component.scss']
})
export class OneColumnLayoutComponent {
  @Input() navigations: string[] = ['Tableau de bord', 'Administration'];
}
