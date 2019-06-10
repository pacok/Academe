import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.scss']
})
export class EditarCursoComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;
  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;
  downloadURL: string;

  validation_messages = {
   'nombre': [
     { type: 'required', message: 'Nombre requerido.' }
   ],
   'autor': [
     { type: 'required', message: 'Autor is required.' }
   ],
   'descripcion': [
     { type: 'required', message: 'Descripcion is required.' },
   ]
 };

  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private _storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    });
  }

  createForm() {
    this.exampleForm = this.fb.group({
      nombre: [this.item.nombre, Validators.required],
      autor: [this.item.autor, Validators.required],
      descripcion: [this.item.descripcion, Validators.required]
    });
  }

  onSubmit(value) {
    value.imagen = this.downloadURL;
    this.firebaseService.updateCurso(this.item.id, value)
    .then(
      res => {
        swal.fire({
          title: 'Curso modificado:',
          text: '',
          type: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Entrar'
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/cursos']);
          }
        });
      }
    );
  }

  delete() {
    swal.fire({
      title: '¿Desea eliminar el curso?',
      text: 'Pulse Si para eliminar',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'No',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.firebaseService.deleteCurso(this.item.id)
            .then(res => {this.router.navigate(['/cursos']);
      }, err => {console.log(err);
      });
      }
    });
  }

  cancel() {
    this.router.navigate(['/cursos']);
  }

  upload(event) {
    // Get input file
    const file = event.target.files[0];

    // Generate a random ID
    const randomId = Math.random().toString(36).substring(2);
    const filepath = `images/${randomId}`;

    const fileRef = this._storage.ref(filepath);

    // Upload image
    const task = this._storage.upload(filepath, file);
    // tslint:disable-next-line:max-line-length
    this.downloadURL = 'https://firebasestorage.googleapis.com/v0/b/academe-f159e.appspot.com/o/images%2F' + randomId + '?alt=media&token=dac0b284-4dd9-496f-b172-abc183ace7fd';


    // Observe percentage changes
    this.uploadProgress = task.percentageChanges();
      // Get notified when the download URL is available
      task.snapshotChanges().pipe(
        finalize(() => this.item.imagen = this.downloadURL)
      ).subscribe();
    }

}
