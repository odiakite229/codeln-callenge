import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, QueryFieldFilterConstraint, addDoc, collection, deleteDoc, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, startAt, updateDoc, where } from '@angular/fire/firestore';
import { DataPaginated } from 'src/app/models/data-paginated.model';
import { WarehouseModel } from 'src/app/models/warehouse.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(
    private firestore: Firestore
  ) { }

  computeTotalCount() {
    return new Promise<number>((resolve, reject) => {
      getCountFromServer(collection(this.firestore, "warehouses"))
        .then(response => {
          resolve(response.data().count);
        })
        .catch(err => reject(err))
    })
  }

  getByUid(uid: string) {
    return new Promise<WarehouseModel | undefined>((resolve, reject) => {
      const docRef = doc(collection(this.firestore, "warehouses"), uid);
      getDoc(docRef)
        .then(response => {
          if(response.exists()) {
            const data = response.data();
            resolve({
              doc: response,
              uid: response.id,
              libelle: data['libelle'],
              areas: data['areas'],
              placer: data['placer'],
              lon: data['lon'],
              lat: data['lat'],
            });
          } else {
            resolve(undefined);
          }
        })
        .catch(err => reject(err));
    });
  }

  getAll(
    lastVisible?: WarehouseModel,
    itemsPerPage: number = 1,
    searchText?: string
  ) {
    return new Promise<DataPaginated<WarehouseModel>>((resolve, reject) => {

      let queryFilters: QueryFieldFilterConstraint[] = [];
      if(searchText) {
        const end = searchText.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
        queryFilters = [
          ...queryFilters,
          where('libelle', '>=', searchText),
          where('libelle', '<=', end)
        ];
      }

      Promise.all([
        getCountFromServer(query(
          collection(this.firestore, "warehouses"),
          ...queryFilters
        )),
        getDocs(query(
          collection(this.firestore, "warehouses"),
          ...queryFilters,
          limit(itemsPerPage),
          ...(lastVisible ? [startAt(lastVisible.doc)] : [])
        ))
      ])
        .then((response) => {
          const totalCount = response[0].data().count;
          console.log(totalCount)
          const snapshot = response[1];
          const warehouses = snapshot.docs.map(doc => ({
            doc: doc,
            uid: doc.id,
            libelle: doc.data()['libelle'],
            areas: doc.data()['areas'],
            placer: doc.data()['placer'],
            lon: doc.data()['lon'],
            lat: doc.data()['lat'],
          }));
          resolve({
            totalCount: totalCount,
            results: warehouses
          });
        })
        .catch(err => reject(err));
    });
  }

  create(input: Omit<WarehouseModel, 'uid' | 'doc'>) {
    return new Promise<WarehouseModel>((resolve, reject) => {
      addDoc(collection(this.firestore, "warehouses"), {
        libelle: input.libelle,
        areas: input.areas,
        placer: input.placer,
        lon: input.lon,
        lat: input.lon
      })
        .then((docRef: DocumentReference<DocumentData>) => {
          docRef
          if(docRef.id) {
            resolve({...input, uid: docRef.id})
          }
          reject(new Error('Une erreur inconnue'))
        })
        .catch(err => reject(err))
    });
  }

  update(input: WarehouseModel) {
    return updateDoc(input.doc!.ref, {
      libelle: input.libelle,
      areas: input.areas,
      placer: input.placer,
    });
  }

  delete(input: WarehouseModel) {
    return deleteDoc(input.doc!.ref);
  }
}
