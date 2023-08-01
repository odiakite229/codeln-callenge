import { Injectable } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { DocumentData, DocumentReference, Firestore, addDoc, collection, getDocs, limit, query, where } from '@angular/fire/firestore';
import { ProfilModel } from 'src/app/models/profil.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) { }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  getCurrentUser() {
    return new Promise<User | null>((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        resolve(user);
      });
    });
  }

  signOut() {
    return signOut(this.auth);
  }

  getUserInfo(uid: string) {
    return new Promise<ProfilModel | undefined>((resolve, reject) => {
      getDocs(query(
        collection(this.firestore, "users"),
        where("authUserUid", "==", uid),
        limit(1)
      )).then(response => {
        if(response.empty) {
          resolve(undefined)
        }
        const doc = response.docs[0];
        const data = doc.data();
        resolve({
          firstname: data['firstname'],
          lastname: data['lastname'],
          authUserUid: data['authUserUid'],
          uid: doc.id,
        });
      }).catch(err => reject(err));
    });
  }

  createUserInfo(input: Omit<ProfilModel, 'uid'>) {
    return new Promise<ProfilModel | undefined>((resolve, reject) => {
      addDoc(collection(this.firestore, "users"), {
        firstname: input.firstname,
        lastname: input.lastname,
        authUserUid: input.authUserUid
      }).then((docRef: DocumentReference<DocumentData>) => {
        docRef
        if(docRef.id) {
          resolve({...input, uid: docRef.id})
        }
        resolve(undefined);
      }).catch(err => reject(err))
    });
  }
}

