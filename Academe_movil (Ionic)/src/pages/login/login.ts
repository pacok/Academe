import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

//codigo nuevo;
import { AuthService } from '../../services/auth/auth.service';
import { TokenStorageService } from '../../services/auth/token-storage.service';
import { AuthLoginInfo } from '../../services/auth/login-info';


import { HomePage } from '../home/home';
import { RegistroComponent } from '../registro/registro.component';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  usuario: string;

  validations_form: FormGroup;
  errorMessage: string = '';

  validation_messages = {
   'usuario': [
     { type: 'required', message: 'El nombre de usuario es obligatorio.' },
     { type: 'pattern', message: 'Introduzca un usuario.' }
   ],
   'password': [
     { type: 'required', message: 'La contraseña es obligatoria.' },
     { type: 'minlength', message: 'La contraseña debe tener al menos 5 carácteres' }
   ]
 };

  constructor(
    private navCtrl: NavController,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
      this.usuario = this.tokenStorage.getUsername();
    }
  }

  ionViewWillLoad(){
    this.validations_form = this.formBuilder.group({
      usuario: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  tryLogin(value){
      this.loginInfo = new AuthLoginInfo(
        value.usuario,
        value.password);
      console.log(value)
      console.log(this.loginInfo)
      


      this.authService.attemptAuth(this.loginInfo).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUsername(data.username);
          this.tokenStorage.saveAuthorities(data.authorities);
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getAuthorities();
          this.navCtrl.push(HomePage);

        },
        error => {
          this.errorMessage = error.error.message;
          this.isLoginFailed = true;         
        }
      );
  }

  goRegisterPage(){
    this.navCtrl.push(RegistroComponent);
  }

}