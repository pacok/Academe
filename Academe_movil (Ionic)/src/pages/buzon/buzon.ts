import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseService } from '../../services/firebase.service';
import { TokenStorageService } from '../../services/auth/token-storage.service';


@IonicPage()
@Component({
  selector: 'page-buzon',
  templateUrl: 'buzon.html',
})
export class BuzonPage {
  items: any;
  usuario = this.token.getUsername();
  mensajes = false;

  constructor(
    public navCtrl: NavController,
    public firebaseService: FirebaseService, 
    private token: TokenStorageService,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
  }
  
  ngOnInit() {
    this.listarPorUsuario(this.usuario);
  }

  listarPorUsuario(usuario) {
    this.firebaseService.getMensajesPorUsuario(usuario).subscribe(result => {
      this.items = result;
      });
  }

  eliminarMensaje(item) {
    let alert = this.alertCtrl.create({
      title: 'Eliminar Mensaje',
      message: '¿Está seguro de que desea eliminarlo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.firebaseService.deleteMensaje(item.payload.doc.id);
          }
        }
      ]
    });
    alert.present();     
  }

}
