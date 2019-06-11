import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { SignUpInfo } from '../../services/auth/signup-info';
import { LoginPage } from '../login/login';
import { AuthService } from '../../services/auth/auth.service'


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent  {

  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  validations_form: FormGroup;

  validation_messages = {
    'nombre': [
      { type: 'required', message: 'El nombre es obligatorio.' },
      { type: 'pattern', message: 'Introduzca un nombre.' }
    ],
    'usuario': [
      { type: 'required', message: 'El nombre de usuario es obligatorio.' },
      { type: 'pattern', message: 'Introduzca un nombre de usuario.' }
    ],
    'password': [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 5 carácteres' }
    ],
    'email': [
      { type: 'required', message: 'El email es obligatorio.' },
      { type: 'pattern', message: 'Introduzca una dirección de correo válida.' }
    ],
  };
  

  constructor(
    private navCtrl: NavController,
    private formBuilder2: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController
    ) { }

  
  ngOnInit() { }

  ionViewWillLoad(){
    this.validations_form = this.formBuilder2.group({
      nombre: new FormControl('', Validators.compose([
        Validators.required
      ])),
      usuario: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  tryRegister(value) {    

    this.signupInfo = new SignUpInfo(
      value.nombre,
      value.usuario,
      value.email,
      value.password);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.logeo();
      },
      error => {
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;       
      }
    );
  }

  logeo() {    
      let alert = this.alertCtrl.create({
        title: 'Usuario Registrado',
        subTitle: 'Pulse Ok para hacer login',
        buttons: [{
          text: 'Ok',
          handler: () => {
            this.navCtrl.push(LoginPage);  
           
          }
        }]        
      });      
      alert.present();
    }
    
  
}
