import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {

  subscriptoresArray = [];
  subscriptoresArrayFinal = [];
  usuarios: any;
  usuarioAcutal = this.token.getUsername();
  exampleForm: FormGroup;

  constructor(
    public firebaseService: FirebaseService,
    private fb: FormBuilder,
    private router: Router,
    private token: TokenStorageService) { }

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
    value.de = this.usuarioAcutal;
    try {
      this.firebaseService.crearMensaje(value)
      .then(
        res => {
          swal.fire({
            title: 'Mensaje Enviado',
            text: '',
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Entrar'
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['/home']);
            }
          });
        }
      );
       } catch (e) {
        swal.fire({
          title: 'Error en los datos',
          text: 'Repasa los datos y vuelve a intentarlo',
          type: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.value) {
          }
        });
      }
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
