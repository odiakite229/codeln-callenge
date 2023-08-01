import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-two-column-layout',
  templateUrl: './two-column-layout.component.html',
  styleUrls: ['./two-column-layout.component.scss']
})
export class TwoColumnLayoutComponent {
  @Input() navigations: string[] = ['Tableau de bord', 'Administration'];
}
