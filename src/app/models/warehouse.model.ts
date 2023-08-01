import { DocumentData, QueryDocumentSnapshot } from "@angular/fire/firestore";

export interface WarehouseModel {
  doc?: QueryDocumentSnapshot<DocumentData>,
  uid: string;
  libelle: string;
  areas: number;
  placer: string;
  lon: number;
  lat: number;
}
