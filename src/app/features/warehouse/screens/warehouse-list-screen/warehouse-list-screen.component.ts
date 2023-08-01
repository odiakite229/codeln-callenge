import { Component, OnInit } from '@angular/core';
import { DocumentData, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DataPaginated } from 'src/app/models/data-paginated.model';
import { WarehouseModel } from 'src/app/models/warehouse.model';
import { ConfirmService } from 'src/app/services/confirm.service';
import { WarehouseService } from 'src/app/services/firebase/warehouse.service';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-warehouse-list-screen',
  templateUrl: './warehouse-list-screen.component.html',
  styleUrls: ['./warehouse-list-screen.component.scss']
})
export class WarehouseListScreenComponent implements OnInit {

  itemsPerPage: number = 20;
  currentPage: number = 1;
  warehousePaginated!: DataPaginated<WarehouseModel>;
  isLoading: boolean = false;

  searchText: string = '';

  deletingIds: Set<string> = new Set();

  constructor(
    private warehouseService: WarehouseService,
    private info: InfoService,
    private router: Router,
    private confirm: ConfirmService
  ){}

  ngOnInit(): void {
    this.loadWarehouse(1, this.itemsPerPage);
  }

  /**
   * Load all warehouses
  */
  loadWarehouse(page: number, itemsPerPage: number, searchText?: string) {
    this.isLoading = true;
    let lastVisible : WarehouseModel | undefined;
    if(this.warehousePaginated && this.currentPage != 1) {
      if(page == this.currentPage) {
        lastVisible = this.warehousePaginated.results[0];
      } else if(page > this.currentPage) {
        // load next page
        lastVisible = this.warehousePaginated.results[this.warehousePaginated.results.length - 1];
      } else {
        // load previous page
        lastVisible = this.warehousePaginated.results[0];
      }
    }
    this.warehouseService.getAll(lastVisible, itemsPerPage, searchText).then((paginated) => {
      this.warehousePaginated = paginated;
      this.itemsPerPage = itemsPerPage;
      if(this.currentPage == page) {
        this.currentPage = 1;
      } else {
        this.currentPage = page;
      }
      this.isLoading = false;
    }).catch(e => this.info.error('Une erreur est survenue lors de la récuperation des données.'))
  }


  search(text: string) {
    this.searchText = text;
    this.loadWarehouse(1, this.itemsPerPage, this.searchText);
  }

  /**
   * Create new warehouse
   */
  createWarehouse() {
    this.router.navigate(['warehouse','create']);
  }

  /**
   * Update warehouse
   * @param warehouse WarehouseModel
   */
  updateWarehouse(warehouse: WarehouseModel) {
    this.router.navigate(['warehouse','update', warehouse.uid]);
  }


  /**
   * Confirm delete warehouse
   * @param warehouse WarehouseModel
   */
  confirmDeleteWarehouse(warehouse: WarehouseModel) {
    this.confirm.showConfirm(
      `Voulez-vous supprimer l'entrepôt '${warehouse.libelle}'`,
      'Cette action est irreversible'
    ).then(result => {
      if(result.isConfirmed) {
        this.deleteWarehouse(warehouse)
      }
    });
  }

  /**
   * Delete warehouse
   * @param warehouse WarehouseModel
   */
  deleteWarehouse(warehouse: WarehouseModel) {
    this.deletingIds.add(warehouse.uid);
    this.warehouseService.delete(warehouse).then(() => {
      const index = this.warehousePaginated!.results.findIndex(w => w.uid == warehouse.uid);
      if(index != -1) {
        this.warehousePaginated!.results.splice(index, 1);
      }
      this.info.success(`Entrepôt '${warehouse.libelle}' a été supprimé.`);
      this.deletingIds.delete(warehouse.uid);
    }).catch(err => {
      this.info.error('Une erreur inconnue s\'est produite.');
      this.deletingIds.delete(warehouse.uid);
    });
  }
}
