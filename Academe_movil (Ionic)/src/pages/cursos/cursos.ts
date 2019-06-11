import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../../services/firebase.service';
import { DetallesCursoPage } from '../detalles-curso/detalles-curso'


@IonicPage()
@Component({
  selector: 'page-cursos',
  templateUrl: 'cursos.html',
})
export class CursosPage {

  searchValue = '';
  items: Array<any>;  
  name_filtered_items: Array<any>;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.firebaseService.getCursos()
    .subscribe(result => {
      this.items = result;
      this.name_filtered_items = result;
    });
  }

  searchByName() {
    const value = this.searchValue.toLowerCase();
    this.firebaseService.searchCursos(value)
    .subscribe(result => {
      this.name_filtered_items = result;
     this.items = this.combineLists(result, this.name_filtered_items);
    });
  }


  combineLists(a, b) {
    const result = [];
    a.filter(x => {
      return b.filter(x2 => {
        if (x2.payload.doc.id === x.payload.doc.id) {
          result.push(x2);
        }
      });
    });
    return result;
  }

  viewDetails(item){
    // debugger
    let data = {
      nombre: item.nombre,
      autor: item.autor,
      descripcion: item.descripcion,
      imagen: item.imagen
    }
    this.navCtrl.push(DetallesCursoPage, {
      data: data
    })
  }
  

}
