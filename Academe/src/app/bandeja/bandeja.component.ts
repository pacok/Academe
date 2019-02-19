import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-bandeja',
  templateUrl: './bandeja.component.html',
  styleUrls: ['./bandeja.component.scss']
})
export class BandejaComponent implements OnInit {

  items: Array<any>;
  usuario = this.token.getUsername();
  mensajes = false;

  constructor(
    private firebaseService: FirebaseService,
    private token: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.listarPorUsuario(this.usuario);
  }

  listarPorUsuario(usuario) {
    this.firebaseService.getMensajesPorUsuario(usuario).subscribe(result => {
      this.items = result;
      });
  }

  eliminarMensaje(item) {
    swal.fire({
      title: '¿Desea eliminar el mensaje?',
      text: 'Pulse Si para eliminar',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'No',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.firebaseService.deleteMensaje(item.payload.doc.id)
            .then(res => {this.router.navigate(['/bandeja']);
      }, err => {console.log(err);
      });
      }
    });
  }

}
