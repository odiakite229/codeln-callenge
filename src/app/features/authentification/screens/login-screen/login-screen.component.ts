import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Database, get, onValue, query, ref, set, update } from '@angular/fire/database';
import { } from '@angular/fire/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InfoService } from 'src/app/services/info.service';
import { Firestore, collectionData, collection, docData, doc } from '@angular/fire/firestore';
// import { AngularFirestore } from '@angular/fire/firestore';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
  form!: FormGroup;
  isLoading: boolean = false;

  hiddenPassword: boolean = true;

  constructor(
    private authService: AuthService,
    private info: InfoService,
    private fb: FormBuilder,
    private router: Router
  ){}


  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    });
  }


  login(){
    if(this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(
      this.form.get('email')?.value,
      this.form.get('password')?.value
    ).then((credential) => {
      this.router.navigate(['warehouse']);
    }).catch((error: FirebaseError) => {
      const code = error.code;
      if(code == 'auth/user-not-found') {
        this.info.error('Email est incorrect');
      } else if(code == 'auth/wrong-password') {
        this.info.error('Le mot de passe est incorrect');
      } else {
        this.info.error('Une erreur inconnue est survenue.')
      }
      this.isLoading = false;
    });
  }
}
