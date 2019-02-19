import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-curso',
  templateUrl: './detalles-curso.component.html',
  styleUrls: ['./detalles-curso.component.scss']
})
export class DetallesCursoComponent implements OnInit {

  item: any;
  usuario: string;

  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private token: TokenStorageService
    ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
      }
    });
  }

  suscribirse() {
    this.usuario = this.token.getUsername();
    this.firebaseService.subscribirCurso(this.usuario, this.item.nombre)
    .then(
      res => {
        swal.fire({
          title: 'Subscrito al Curso:',
          text: this.item.nombre,
          type: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/home']);
          }
        });
      }
    );
  }

}
