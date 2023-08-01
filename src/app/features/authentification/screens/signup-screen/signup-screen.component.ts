import { Component } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Auth } from '@angular/fire/auth';
import { Database } from '@angular/fire/database';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-signup-screen',
  templateUrl: './signup-screen.component.html',
  styleUrls: ['./signup-screen.component.scss']
})
export class SignupScreenComponent {
  form!: FormGroup;
  isLoading: boolean = false;

  hiddenPassword: boolean = true;

  constructor(
    private authService: AuthService,
    private info: InfoService,
    public fb: FormBuilder,
    private router: Router
  ){}


  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      firstname: new FormControl<string>('', [Validators.required]),
      lastname: new FormControl<string>('', [Validators.required]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    });
  }


  signup(){
    if(this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.signup(
      this.form.get('email')?.value,
      this.form.get('password')?.value
    ).then(async (credential) => {
      console.log(credential.user)
      await this.authService.createUserInfo({
        firstname: this.form.get('firstname')?.value,
        lastname: this.form.get('lastname')?.value,
        authUserUid: credential.user.uid,
      })
      this.isLoading = false;
      this.router.navigate(['warehouse'])
     }).catch((error: FirebaseError) => {
      console.log(error)
      const code = error.code;
      if(code == "auth/invalid-email") {
        this.info.error('Votre email est invalide.');
      } else if(code == "auth/missing-email") {
        this.info.error('Email n\'a pas été fourni.');
      } else if(code == "auth/email-already-in-use") {
        this.info.error('Cet email est déja utilisé.');
      } else if(code == "auth/weak-password") {
        this.info.error('Votre mot de passe est faible.');
      } else {
        this.info.error('Une erreur inconnue est survenue.');
      }
      this.isLoading = false;
    });
  }
}
