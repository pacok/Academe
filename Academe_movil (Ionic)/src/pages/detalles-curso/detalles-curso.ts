import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../../services/firebase.service';
import { TokenStorageService } from '../../services/auth/token-storage.service';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home'

/**
 * Generated class for the DetallesCursoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalles-curso',
  templateUrl: 'detalles-curso.html',
})
export class DetallesCursoPage {


  item: any;
  usuario: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseService: FirebaseService,
    private token: TokenStorageService,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallesCursoPage');
  }

  ngOnInit() {
    this.getData()
  }

  getData() {
    this.item = this.navParams.get('data');
  }

  suscribirse() {
    let alert = this.alertCtrl.create({
      title: 'Subscribirse al Curso',
      message: '¿Está seguro de que desea subscribirse?',
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
            this.usuario = this.token.getUsername();
            this.firebaseService.subscribirCurso(this.usuario, this.item.nombre);
            this.navCtrl.push(HomePage);
          }
        }
      ]
    });
    alert.present();

  }

}
