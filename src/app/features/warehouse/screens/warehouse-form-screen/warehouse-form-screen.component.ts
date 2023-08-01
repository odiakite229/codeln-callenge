import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WarehouseModel } from 'src/app/models/warehouse.model';
import { ConfirmService } from 'src/app/services/confirm.service';
import { WarehouseService } from 'src/app/services/firebase/warehouse.service';
import { InfoService } from 'src/app/services/info.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-warehouse-form-screen',
  templateUrl: './warehouse-form-screen.component.html',
  styleUrls: ['./warehouse-form-screen.component.scss']
})
export class WarehouseFormScreenComponent implements OnInit {

  warehouse?: WarehouseModel; // to update

  form!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private warehouseServ: WarehouseService,
    private info: InfoService,
    private confirm: ConfirmService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.warehouse = this.route.snapshot.data['warehouse'];
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      libelle: new FormControl<string>(this.warehouse ? this.warehouse!.libelle : '', [Validators.required]),
      areas: new FormControl<number>(this.warehouse ? this.warehouse!.areas : 0, [Validators.required]),
      lon: new FormControl<number>(this.warehouse ? this.warehouse!.lon : 0, [Validators.required]),
      lat: new FormControl<number>(this.warehouse ? this.warehouse!.lat : 0, [Validators.required]),
      placer: new FormControl<string>(this.warehouse ? this.warehouse!.placer : '', [Validators.required]),
    });
  }

  goBack(){
    this.router.navigate(['warehouse']);
  }

  /**
   * Cancel operation and return back
   */
  cancel() {
    this.showConfirm(
      "Voulez-vous annuler? Vous perdez vos données."
    ).then(result => {
      if(result.isConfirmed) {
        this.goBack();
      }
    });
  }


  /**
   * Retrieve form data
   * @returns Omit<WarehouseModel, 'uid'>
   */
  getFormData(): Omit<WarehouseModel, 'uid'> {
    return {
      libelle: this.form.get('libelle')?.value,
      areas: this.form.get('areas')?.value,
      lon: this.form.get('lon')?.value,
      lat: this.form.get('lat')?.value,
      placer: this.form.get('placer')?.value,
    }
  }

  /**
   * Show confirm dialog
   * @param title string
   * @returns Promise<SweetAlertResult<any>>
   */
  showConfirm(title: string) {
    return this.confirm.showConfirm(
      title,
      "Cette action est irreversible"
    );
  }

  /**
   * Save or update warehouse
   */
  save() {
    if(!this.warehouse) {
      this.showConfirm(
        "Voulez-vous vraiment continuer l'enregistrement?"
      ).then(result => {
        this.isLoading = true;
        if(result.isConfirmed) {
          this.warehouseServ.create({
            ...this.getFormData()
          }).then(warehouse => {
            this.info.success(`Entrepôt '${warehouse.libelle}' a été crée avec succès`);
            this.router.navigate(['warehouse']);
          }).catch(err => {
            console.log(err);
            this.info.error('Une erreur inconnue s\'est produite');
          })
        }
      });
    } else {
      this.showConfirm(
        `Voulez-vous continuer la modification de l'entrepôt '${this.warehouse.libelle}'?`
      ).then(result => {
        this.isLoading = true;
        if(result.isConfirmed) {
          const formData = this.getFormData();
          this.warehouseServ.update({
            uid: this.warehouse!.uid,
            doc: this.warehouse!.doc,
            ...formData
          }).then(() => {
            this.info.success(`Entrepôt '${formData.libelle}' a été modifié avec succès`);
            this.router.navigate(['warehouse']);
          }).catch(err => {
            console.log(err);
            this.info.error('Une erreur inconnue s\'est produite');
          })
        }
      });
    }
  }
}
