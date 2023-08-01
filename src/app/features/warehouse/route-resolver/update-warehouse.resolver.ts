import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY, Observable, catchError, from, of, switchMap } from 'rxjs';
import { WarehouseModel } from 'src/app/models/warehouse.model';
import { WarehouseService } from 'src/app/services/firebase/warehouse.service';
import { InfoService } from 'src/app/services/info.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateWarehouseResolver {

  constructor(
    private warehouseService: WarehouseService,
    private info: InfoService,
    private router: Router,
  ){}

  handleError(message: string): Observable<never> {
    this.info.error(message);
    this.router.navigate(['warehouse']);
    return EMPTY;
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<WarehouseModel | undefined> {
    return from(this.warehouseService.getByUid(route.paramMap.get('id')!)).pipe(
      switchMap(response => {
        if(!response) {
          return this.handleError('L\'entrepot à modifier n\'existe pas');
        }
        return of(response)
      }),
      catchError(() => {
        return this.handleError('Nous rencontrons une erreur lors de la récuperation de l\'entrepot à modifier.')
      })
    )
  }
}
