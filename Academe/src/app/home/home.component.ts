import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;
  public ocultar = false;
  public ocultar2 = false;
  public items3: Array<any>;
  item4: any;
  usuarios: any;
  usuario: string;
  subscripciones = false;
  subscriptoresArray = [];
  subscriptoresArrayFinal = [];
  private roles: string[];
  private authority: string;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private token: TokenStorageService) { }

  images = ['../../assets/img/imagen1.jpg',
               '../assets/img/imagen2.jpg',
               '../assets/img/imagen3.jpeg'
    ];

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.sacarUsuarios();
    this.listarPorUsuario(this.token.getUsername());
    this.roles = this.token.getAuthorities();
    this.roles.every(role => {
      if (role === 'ROL_ADMINISTRADOR') {
        this.authority = 'admin';
        return false;
      }
      this.authority = 'user';
      return true;
    });
  }
  accion() {
    this.ocultar = !this.ocultar;
     if (this.items3.length === 0) {
      this.subscripciones = true;
    }
  }

  accion2() {
    this.ocultar2 = !this.ocultar2;
  }

  listarPorUsuario(usuario) {
    this.firebaseService.getSubscripcionesPorUsuario(usuario).subscribe(result => {
      this.items3 = result;
      });
  }

  localizarCursoPorNombre(item) {
    this.firebaseService.getCursosPorNombre(item.payload.doc.data().curso).subscribe(result => {
      this.item4 = result;
      this.IrACursar(this.item4[0]);
      });
  }

  IrACursar(item) {
    this.router.navigate(['/cursar/' + item.payload.doc.id]);
  }

  IrAMensajes() {
    this.router.navigate(['/mensajes/']);

  }

  IrABandeja() {
    this.router.navigate(['/bandeja/']);
  }
  IrARepote() {
    this.router.navigate(['/reporteCursos/']);
  }

  eliminarSubscripcion(item) {
    swal.fire({
      title: '¿Desea eliminar la subscripcion?',
      text: 'Pulse Si para eliminar',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'No',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.firebaseService.deleteSubscripcion(item.payload.doc.id)
            .then(res => {this.router.navigate(['/home']);
      }, err => {console.log(err);
      });
      }
    });
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

  logout() {
    swal.fire({
      title: '¿Desea Salir?',
      text: 'Pulse Si para salir',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'No',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.token.signOut();
        window.location.reload();
      }
    });
  }
}
