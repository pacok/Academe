import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseService } from '../../services/firebase.service';
import { HomePage } from '../home/home'

@IonicPage()
@Component({
  selector: 'page-cursar',
  templateUrl: 'cursar.html',
})
export class CursarPage {

  item: any;
  items4: any;
  tema = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public firebaseService: FirebaseService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CursarPage');
  }

  ngOnInit() {
    this.getData();
    this.ContenidoDelCurso(this.item.nombre);
  }

  getData() {
    this.item = this.navParams.get('data');
  }

  ContenidoDelCurso(curso) {
    console.log(curso);
    console.log('buscando contenido');
    this.firebaseService.getContenidoPorCurso(curso).subscribe(result => {
      this.items4 = result;
      if (this.items4.length === 0) {
        this.tema = true;
      }
    });
  }

  eliminarSubscripcion() {
    let alert = this.alertCtrl.create({
      title: 'Eliminar Subscripción',
      message: '¿Está seguro de que desea eliminarla?',
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
            this.firebaseService.deleteSubscripcion(this.item.id)
            this.navCtrl.push(HomePage);
          }
        }
      ]
    });
    alert.present();
  }

}
