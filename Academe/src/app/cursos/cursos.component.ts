import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, Params } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  searchValue = '';
  items: Array<any>;
  items2: Array<any>;
  items3: Array<any>;
  name_filtered_items: Array<any>;
  private roles: string[];
  private authority: string;
  private usuario;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit() {
    this.getData();
    this.getData2();
    this.usuario = this.tokenStorage.getUsername();
    this.roles = this.tokenStorage.getAuthorities();
    this.roles.every(role => {
      if (role === 'ROL_ADMINISTRADOR') {
        this.authority = 'admin';
        return false;
      }
      this.authority = 'user';
      return true;
    });
    this.listarPorUsuario(this.usuario);
  }

  getData() {
    this.firebaseService.getCursos()
    .subscribe(result => {
      this.items = result;
      this.name_filtered_items = result;
    });
  }

  editarCurso(item) {
    this.router.navigate(['/editar/' + item.payload.doc.id]);
  }

  temasCurso(item) {
    this.router.navigate(['/temas/' + item.payload.doc.id]);
  }

  detallesCurso(item) {
    this.router.navigate(['/detalles-curso/' + item.payload.doc.id]);
  }

  capitalizeFirstLetter(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  crearCurso() {
    this.router.navigate( ['/nuevo-curso'] );

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

  getData2() {
    this.firebaseService.getSubscripciones()
    .subscribe(result => {
      this.items2 = result;
    });
  }

  listarPorUsuario(usuario) {
    this.firebaseService.getSubscripcionesPorUsuario(usuario).subscribe(result => {
      this.items3 = result;
    });

  }

}
