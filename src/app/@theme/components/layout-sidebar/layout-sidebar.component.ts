import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'src/app/services/firebase/warehouse.service';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-layout-sidebar',
  templateUrl: './layout-sidebar.component.html',
  styleUrls: ['./layout-sidebar.component.scss']
})
export class LayoutSidebarComponent implements OnInit {
  warehouseTotalCount!: number;

  isLoading: boolean = false;

  constructor(
    private warehouseService: WarehouseService,
    private info: InfoService
  ){}

  ngOnInit(): void {
    this.getDocTotalCount();
  }

  getDocTotalCount() {
    this.isLoading = true;
    Promise.all([
      this.warehouseService.computeTotalCount()
    ])
      .then(response => {
        this.warehouseTotalCount = response[0];

        this.isLoading = false;
      })
      .catch(err => this.info.error(`Une erreur s'est produite lors de la récuperation des statistiques.`))
  }
}
