import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseService } from '../../services/firebase.service';
import { TokenStorageService } from '../../services/auth/token-storage.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HomePage } from '../home/home'

@IonicPage()
@Component({
  selector: 'page-mensajes',
  templateUrl: 'mensajes.html',
})
export class MensajesPage {

  subscriptoresArray: any[];
  usuarios: any;
  subscriptoresArrayFinal: any[];
  usuarioAcutal = this.token.getUsername();
  exampleForm: FormGroup;
  errorMessage = '';
  validations_form: FormGroup;

  constructor(
    public firebaseService: FirebaseService,
    private token: TokenStorageService,
    public navCtrl: NavController,
    private fb: FormBuilder,
    private formBuilder2: FormBuilder, 
    public navParams: NavParams,
    private alertCtrl: AlertController) {
  }
  ionViewWillLoad(){
    this.validations_form = this.formBuilder2.group({
      de: new FormControl('', Validators.compose([
        Validators.required
      ])),
      para: new FormControl('', Validators.compose([
        Validators.required
      ])),
      asunto: new FormControl('', Validators.compose([
        Validators.required
      ])),
      mensaje: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  validation_messages = {
    'para': [
      { type: 'required', message: 'El destinatario es obligatorio.' },
      { type: 'pattern', message: 'Seleccione un nombre.' }
    ],
    'asunto': [
      { type: 'required', message: 'El asunto es obligatorio.' },
      { type: 'pattern', message: 'Indique el asunto del mensaje.' }
    ],
    'mensaje': [
      { type: 'required', message: 'El mensaje es obligatorio.' },
      { type: 'pattern', message: 'Debe escribir algo en el cuerpo del mensaje.' }
    ]
  };


  ngOnInit() {
    this.createForm();
    this.sacarUsuarios();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      de: ['', Validators.required ],
      para: ['', Validators.required ],
      asunto: ['', Validators.required ],
      mensaje: ['', Validators.required ]
    });
  }

  onSubmit(value) {
    let data = {
      de: value.de,
      para: value.para[0],
      asunto: value.asunto,
      mensaje: value.mensaje
    }
    console.log(value);
    console.log(data);
    let alert = this.alertCtrl.create({
      title: 'Mensaje Enviado',
      subTitle: 'Pulse Ok para finalizar',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.firebaseService.crearMensaje(data)
          this.navCtrl.push(HomePage);  
         
        }
      }]        
    });      
    alert.present();
  }

  sacarUsuarios() {
    this.subscriptoresArray = [];
    this.firebaseService.getSubscripciones().subscribe(result => {
      this.usuarios = result;
      this.usuarios.forEach((item) => {
         this.subscriptoresArray.push(item.payload.doc.data().alumno);
      });
      this.subscriptoresArrayFinal = this.eliminarDuplicados(this.subscriptoresArray);
    });
  }

eliminarDuplicados(arr) {
  let i;
      const len = arr.length;
      const out = [];
      const obj = {};
  for (i = 0; i < len; i++) {
     obj[arr[i]] = 0;
  }
  // tslint:disable-next-line:forin
  for (i in obj) {
     out.push(i);
  }
  return out;
 }

}
