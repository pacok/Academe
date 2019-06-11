import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FirebaseService } from '../../services/firebase.service';

import { TokenStorageService } from '../../services/auth/token-storage.service';
import {CursosPage} from '../cursos/cursos';
import {CursarPage} from '../cursar/cursar'
import { MensajesPage } from '../mensajes/mensajes';
import { BuzonPage } from '../buzon/buzon';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  info: any;
  valor = false;
  subscripciones: any;
  ocultar = false;
  item4: any;

  constructor(
    public navCtrl: NavController,
    private token: TokenStorageService,
    private alertCtrl: AlertController,
    public firebaseService: FirebaseService,
    ) {

  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.listarPorUsuario(this.token.getUsername());
    
  }

  IraCursos() {
    this.navCtrl.push(CursosPage);
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: 'Cerrar Sesión',
      message: '¿Está seguro de que desea salir?',
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
            this.token.signOut();
            window.location.reload();
          }
        }
      ]
    });
    alert.present();
  }

  despMensajes(){
    this.valor= !this.valor;
  }
  despSubscripciones(){
    this.ocultar= !this.ocultar;
  }

  listarPorUsuario(usuario) {
    this.firebaseService.getSubscripcionesPorUsuario(usuario).subscribe(result => {
      this.subscripciones = result;
      });
  }

  localizarCursoPorNombre(item) {
    this.firebaseService.getCursosPorNombre(item.payload.doc.data().curso).subscribe(result => {     
      this.item4 = result;      
      this.IrACursar(this.item4[0], item.payload.doc.id);
      });
  }

  IrACursar(item, id) {
    let data = {
      nombre: item.payload.doc.data().nombre,
      autor: item.payload.doc.data().autor,
      descripcion: item.payload.doc.data().descripcion,
      imagen: item.payload.doc.data().imagen,
      id: id
    }
    this.navCtrl.push(CursarPage, {
      data: data
    })
  }

  IrAMensajes() {
    this.navCtrl.push(MensajesPage)
  }

  IrABuzon() {
    this.navCtrl.push(BuzonPage)
  }


}
